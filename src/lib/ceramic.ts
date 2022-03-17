import { Core } from "@self.id/core";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";

export const fetchProfile = async (address: string) => {
  const core = new Core({ ceramic: "testnet-clay" });
  const link = await Caip10Link.fromAccount(
    core.ceramic,
    `${address.toLowerCase()}@eip155:1`
  );

  const profile = await core.get("basicProfile", link.did || "");
  return profile;
};
