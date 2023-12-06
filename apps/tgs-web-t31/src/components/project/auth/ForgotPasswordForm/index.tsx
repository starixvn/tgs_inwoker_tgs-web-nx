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
<<<<<<< develop
import { theme } from "@/theme";
=======
>>>>>>> checkpoint

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
<<<<<<< develop
        <LoginTitle>{`${i18n.t("forgotPassword.title")}`.toUpperCase()}</LoginTitle>
=======
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "64px" }} />
        ) : (
          <LoginTitle>{`${i18n.t("forgotPassword.title")}`.toUpperCase()}</LoginTitle>
        )}

>>>>>>> checkpoint
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
<<<<<<< develop
        <LanguageSwitch
          style={{ width: "100%", margin: "24px 0", border: `1px solid ${theme.white30}` }}
        />
=======
        <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
>>>>>>> checkpoint
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
