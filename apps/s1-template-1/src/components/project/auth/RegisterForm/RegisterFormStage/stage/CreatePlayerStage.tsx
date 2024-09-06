import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { useCreatePlayerStage } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";
import styled from "styled-components";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`;

const CreatePlayerStage = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    //  confirmAdult
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useCreatePlayerStage();
  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={registerError}
      buttonText={i18n.t("createaccount")}
    >
      <VerifyAgeContainer>
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />I agree to the User
        Agreement & confirm I am at least 18 years old
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
