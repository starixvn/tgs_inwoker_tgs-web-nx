import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { ActiveTab, AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";

import ForgotPasswordFormStage from "./ForgotPasswordFormStage";

const ForgotPasswordForm = () => {
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "50px", maxWidth: "none" }} />
        ) : (
          <ActiveTab>{i18n.t("forgotPassword.title").toUpperCase()}</ActiveTab>
        )}

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
