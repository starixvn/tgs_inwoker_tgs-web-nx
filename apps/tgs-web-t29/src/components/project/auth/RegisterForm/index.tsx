import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RedirectToLoginHint from "@/components/project/auth/RegisterForm/RedirectToLoginHint";
import {
  AuthFormContainer,
  LoginTitle,
  FormContainer,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "64px" }} />
      ) : (
        <LoginTitle>{`${i18n.t("common.register")}`.toUpperCase()}</LoginTitle>
      )}

      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
