import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LitJsSdk from "@alexkeating/lit-js-sdk";
import { ethers } from "ethers";
import { Web3Service } from "@unlock-protocol/unlock-js";

import { getClient } from "lib/ceramic";
import { getKeyEncryptText, getKeyAndDecrypt } from "lib/lit";
import { PUBLISHED_MODELS } from "../../constants";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import {
  litClient,
  singleAddressAccessControl,
  generateSymmetricKey,
  LitAccess,
  AccessControl,
  Operator,
} from "lib/lit";
import { fetchLocks } from "services/lock/slice";
import { RootState } from "store";
import { ChainName } from "types";

type PublicationLock = {
  chainId: string;
  address: string;
};

export type Publication = {
  name?: string;
  description?: string;
  draftAccess: LitAccess;
  publishAccess: LitAccess;
  locks?: PublicationLock[];
  mailTo?: string;
  apiKey?: string;
};

export const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    name: "",
    description: "",
    draftAccess: {
      encryptedSymmetricKey: "",
      accessControlConditions: [] as (AccessControl | Operator)[],
    },
    publishAccess: {
      encryptedSymmetricKey: "",
      accessControlConditions: [] as (AccessControl | Operator)[],
    },
    locks: [] as PublicationLock[],
    mailTo: "",
    apiKey: "",
  },
  reducers: {
    create(state, action: PayloadAction<Publication>) {
      state.name = action.payload.name || "";
      state.description = action.payload.description || "";
      state.draftAccess = action.payload.draftAccess;
      state.publishAccess = action.payload.publishAccess;
      state.locks = action.payload.locks || [];
      state.mailTo = action.payload.mailTo || "";
      state.apiKey = action.payload.apiKey || "";
    },
  },
});

export const publicationActions = publicationSlice.actions;

export const fetchPublicationSlice = createSlice({
  name: "fetchPublication",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPublication.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchPublication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPublication.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const createPublicationSlice = createSlice({
  name: "createPublication",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPublication.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPublication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPublication.rejected, (state, action) => {
      console.error(action);
      state.loading = false;
    });
  },
});

export const updatePublicationSlice = createSlice({
  name: "updatePublication",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePublication.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePublication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePublication.rejected, (state, action) => {
      console.error(action);
      state.loading = false;
    });
  },
});

// async thunk that creates a publication
export const createPublication = createAsyncThunk(
  "publication/create",
  async (
    args: {
      publication: Omit<Publication, "draftAccess" | "publishAccess">;
      address: string;
      chainName: string;
    },
    thunkAPI
  ) => {
    if (!args.address) {
      return;
    }
    const pub = args.publication;
    const client = await getClient();
    const model = new DataModel({
      ceramic: client.ceramic,
      model: PUBLISHED_MODELS,
    });
    const store = new DIDDataStore({ ceramic: client.ceramic, model: model });
    try {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: args.chainName,
      });
      const draftKey = await generateSymmetricKey();
      const addressAccessControls = singleAddressAccessControl(args.address);
      const draftEncryptedSymmetricKey = await litClient.saveEncryptionKey({
        accessControlConditions: addressAccessControls,
        symmetricKey: draftKey,
        authSig,
        chain: args.chainName,
      });

      const publishKey = await generateSymmetricKey();
      const publishEncryptedSymmetricKey = await litClient.saveEncryptionKey({
        accessControlConditions: addressAccessControls,
        symmetricKey: publishKey,
        authSig,
        chain: args.chainName,
      });

      const publication = {
        name: pub.name,
        description: pub.description,
        draftAccess: {
          encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
            draftEncryptedSymmetricKey,
            "base16"
          ),
          accessControlConditions: addressAccessControls,
        },
        publishAccess: {
          encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
            publishEncryptedSymmetricKey,
            "base16"
          ),
          accessControlConditions: addressAccessControls,
        },
      };
      await store.set("publication", publication);
      thunkAPI.dispatch(publicationActions.create(publication));
      return publication;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to save");
    }
  }
);

// async thunk that fetches a publication
export const fetchPublication = createAsyncThunk(
  "publication/fetch",
  async (
    args: {
      provider: ethers.providers.Provider;
      web3Service: Web3Service;
      chainName: ChainName;
    },
    thunkAPI
  ) => {
    const client = await getClient();
    const model = new DataModel({
      ceramic: client.ceramic,
      model: PUBLISHED_MODELS,
    });
    const store = new DIDDataStore({ ceramic: client.ceramic, model: model });
    try {
      let publication = await store.get("publication");
      if (publication.apiKey) {
        const apiKey = await getKeyAndDecrypt(
          args.chainName,
          publication.draftAccess.encryptedSymmetricKey,
          publication.draftAccess.accessControlConditions,
          publication.apiKey
        );
        publication = { ...publication, apiKey };
      }
      if (publication) {
        thunkAPI.dispatch(publicationActions.create(publication));
        thunkAPI.dispatch(
          fetchLocks({
            provider: args.provider,
            web3Service: args.web3Service,
            publication,
          })
        );
      }
      return publication;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

// async thunk that creates a publication
export const updatePublication = createAsyncThunk(
  "publication/update",
  async (
    args: {
      publication: Omit<Publication, "draftAccess" | "publishAccess">;
      chainName: ChainName;
    },
    thunkAPI
  ) => {
    const pub = args.publication;
    const client = await getClient();
    const model = new DataModel({
      ceramic: client.ceramic,
      model: PUBLISHED_MODELS,
    });
    const store = new DIDDataStore({ ceramic: client.ceramic, model: model });
    try {
      const { publication } = thunkAPI.getState() as RootState;
      const updates = {} as {
        name: string;
        description: string;
        locks: PublicationLock[];
        mailTo: string;
        apiKey: string;
      };
      if (pub.name !== undefined) {
        updates["name"] = pub.name;
      }
      if (pub.description !== undefined) {
        updates["description"] = pub.description;
      }
      if (pub.locks !== undefined) {
        updates["locks"] = pub.locks;
      }
      if (pub.mailTo !== undefined) {
        updates["mailTo"] = pub.mailTo;
      }
      if (pub.apiKey !== undefined) {
        const content = await getKeyEncryptText(
          args.chainName,
          publication.draftAccess.encryptedSymmetricKey,
          publication.draftAccess.accessControlConditions,
          pub.apiKey
        );

        updates["apiKey"] = content;
      }

      const updatedPublication = {
        ...publication,
        ...updates,
      };
      await store.set("publication", updatedPublication);
      if (pub.apiKey !== undefined) {
        updatedPublication["apiKey"] = pub.apiKey;
      }
      await thunkAPI.dispatch(publicationActions.create(updatedPublication));
      return publication;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to update publication");
    }
  }
);

export default publicationSlice.reducer;
