import React, { useEffect, useState } from "react";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import {
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
  usePromotionCode,
  UserTypeEnum,
} from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { useCreatePlayerStage } from "@tgs-web-nx/core/features";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  display: flex;
  align-items: start;
  align-items: center;
`;

const RegisterContract = styled.div`
  max-width: 500px;
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
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />
        <RegisterContract>{i18n.t("web.register.contract")}</RegisterContract>
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
