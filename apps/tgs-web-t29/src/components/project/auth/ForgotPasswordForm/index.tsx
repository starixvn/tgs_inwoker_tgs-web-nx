import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ForgotPasswordStageEnum } from "@tgs-web-nx/types";
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
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "64px" }} />
      ) : (
        <LoginTitle>{`${i18n.t("forgotPassword.title")}`.toUpperCase()}</LoginTitle>
      )}

      <FormContainer>
        <ForgotPasswordFormStage currentStage={ForgotPasswordStageEnum.VerifyPhone} />
      </FormContainer>

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(ForgotPasswordForm);
