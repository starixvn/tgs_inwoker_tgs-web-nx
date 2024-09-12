import { useCreatePlayerStage } from "@tgs-web-nx/core/features";
import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { Checkbox } from "@/components/UI/Checkbox";
import FormikForm from "@/components/project/FormikForm";

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
      buttonText={i18n.t("web.register.signup")}
    >
      <VerifyAgeContainer>
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />
        {i18n.t("web.register.useragreement")}
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
