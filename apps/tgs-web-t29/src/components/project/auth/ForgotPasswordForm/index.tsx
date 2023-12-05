import React, { useCallback, useMemo, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ForgotPasswordStageEnum, ValueOf } from "@tgs-web-nx/types";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import RedirectToLoginHint from "@/components/project/auth/RegisterForm/RedirectToLoginHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import ForgotPasswordFormStage from "@/components/project/auth/ForgotPasswordForm/ForgotPasswordFormStage";

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "64px" }} />
        ) : (
          <LoginTitle>{`${i18n.t("forgotPassword.title")}`.toUpperCase()}</LoginTitle>
        )}

        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
