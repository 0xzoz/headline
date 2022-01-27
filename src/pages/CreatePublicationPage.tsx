import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "store";
import { createPublication, Publication } from "services/publication/slice";

import Button from "components/Button";
import BackButton from "components/BackButton";
import Icon from "components/Icon";
import Input from "components/Input";
import { Layout, HeaderContainer, BodyContainer } from "components/Layout";
import Title from "components/Title";
import Text from "components/Text";
import FormTextArea from "components/FormTextArea";

import { useCermaic } from "context/CeramicContext";

import small_logo from "assets/small_logo.svg";

const StyledLayout = styled(Layout)`
  grid-template:
    "header" 9.6rem
    "body" 1fr
    / 1fr;
`;
const StyledBodyContainer = styled(BodyContainer)`
  align-items: flex-start;
`;

const StyledHeaderContainer = styled(HeaderContainer)`
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.colors.lightGrey}`};
`;

const ContentContainer = styled(BodyContainer)`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
  width: 100%;
  height: 100%;
  max-height: 40rem;
  justify-content: space-evenly;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 6rem;
  align-items: center;
`;

const BodyHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CreateFormContainer = styled.form`
  max-width: 48rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const CreatePublicationPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const { client } = useCermaic();
  const publicationLoading = useAppSelector(
    (state) => state.publication.loading
  );
  const onSubmit: SubmitHandler<Publication> = (data) => {
    console.log("submitting");
    console.log(data);
    console.log("submitting 2");
    dispatch(
      createPublication({
        name: data.name || "",
        description: data.description || "",
      })
    );
  };

  return (
    <StyledLayout>
      <StyledHeaderContainer>
        <LeftHeaderContainer>
          <BackButton size="md" />
          <Icon size="xl" src={small_logo} alt="Unlock logo" />
          <Text size="md" weight="semibold" color="helpText">
            Create Publication
          </Text>
        </LeftHeaderContainer>
      </StyledHeaderContainer>
      <StyledBodyContainer>
        <ContentContainer>
          <BodyHeaderContainer>
            <Title size="md" color="label">
              Start writing & publishing
            </Title>
            <Text size="md" color="label">
              Create the publication that is truly owned by you
            </Text>
          </BodyHeaderContainer>
          <CreateFormContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
              title="Publication Name"
              errorMsg={errors?.publicationName}
              {...register("name")}
            />
            <FormTextArea
              title="Description"
              errorMsg={errors?.publicationName}
              {...register("description")}
            />
            <StyledButton
              type="submit"
              size="xl"
              color="primary"
              isLoading={publicationLoading}
              loadingText="Creating..."
            >
              Looks good, lets do it
            </StyledButton>
          </CreateFormContainer>
        </ContentContainer>
      </StyledBodyContainer>
    </StyledLayout>
  );
};

export default CreatePublicationPage;
