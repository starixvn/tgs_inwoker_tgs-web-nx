import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import {
  FormInputTypeEnum,
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
  usePromotionCode,
  UserTypeEnum,
} from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { useCreatePlayerStage } from "@/hooks/stage/useCreatePlayerStage";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  display: flex;
  align-items: start;
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
        {i18n.t("web.register.contract")}
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
