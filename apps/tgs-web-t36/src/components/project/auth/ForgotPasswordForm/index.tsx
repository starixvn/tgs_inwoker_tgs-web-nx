import React from "react";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";

const ForgotPasswordForm = () => {
  return (
    <AuthFormContainer>
      <BrandLogo style={{ maxHeight: "55px" }} />
      <ForgotPasswordStageContextProvider>
        <AuthFormContainer>
          <FormContainer>
            <ForgotPasswordFormStage />
          </FormContainer>

          <RedirectToLoginHint style={{ marginBottom: "20px" }} />
          <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
        </AuthFormContainer>
      </ForgotPasswordStageContextProvider>
    </AuthFormContainer>
  );
};

export default React.memo(ForgotPasswordForm);
