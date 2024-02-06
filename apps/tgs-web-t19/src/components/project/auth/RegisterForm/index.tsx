import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import {
  AuthFormContainer,
  LoginTitle,
  FormContainer,
} from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";

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

      <RedirectToLoginHint />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
