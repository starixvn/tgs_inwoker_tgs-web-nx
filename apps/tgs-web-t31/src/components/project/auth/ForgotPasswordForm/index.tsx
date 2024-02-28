import React from "react";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer, LoginTitle } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      {isMobileSize ? (
        <BrandLogo style={{ marginTop: "40px", marginBottom: "40px", maxWidth: "none" }} />
      ) : (
        <LoginTitle>{i18n.t("common.login").toUpperCase()}</LoginTitle>
      )}
      <AuthFormContainer>
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>
        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <LanguageSwitch />
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
