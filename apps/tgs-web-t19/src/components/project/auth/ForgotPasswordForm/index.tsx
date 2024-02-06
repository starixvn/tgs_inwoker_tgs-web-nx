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
import BrandLogo from "@/components/project/BrandLogo";

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "64px" }} />
        ) : (
          <LoginTitle>{`${i18n.t("forgotPassword.title")}`}</LoginTitle>
        )}

        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint />
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
