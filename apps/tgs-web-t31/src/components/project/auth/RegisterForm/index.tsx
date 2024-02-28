import React from "react";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer, LoginTitle } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginTop: "40px", marginBottom: "40px", maxWidth: "none" }} />
      ) : (
        <LoginTitle>{i18n.t("common.login").toUpperCase()}</LoginTitle>
      )}
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>
      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
