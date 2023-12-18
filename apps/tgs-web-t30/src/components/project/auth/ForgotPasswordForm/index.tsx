import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
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
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <LoginTitle style={{ fontSize: "2.25rem" }}>
          {`${i18n.t("forgotPassword.title")}`.toUpperCase()}
        </LoginTitle>

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
