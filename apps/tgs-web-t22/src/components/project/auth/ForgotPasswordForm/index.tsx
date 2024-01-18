import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";

const ForgotPasswordForm = () => {
  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <BrandLogo style={{ marginBottom: "67px", maxWidth: "none" }} />
        <LoginTitle>{`${i18n.t("forgotPassword.title")}`.toUpperCase()}</LoginTitle>

        <FormContainer>
          <ForgotPasswordFormStage />
          <RedirectToLoginHint style={{ margin: "16px 0" }} />
          <LanguageSwitch style={{ width: "100%"}} />
        </FormContainer>
      </AuthFormContainer>
      
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
