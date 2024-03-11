import React from "react";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const ForgotPasswordForm = () => {
  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <BrandLogo style={{ marginBottom: "64px", maxWidth: "none" }} />
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint />
      </AuthFormContainer>
      <LanguageSwitch style={{ width: "100%", margin: "auto auto 0" }} />
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
