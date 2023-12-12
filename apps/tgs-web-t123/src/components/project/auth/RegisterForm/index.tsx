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
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import { theme } from "@/theme";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      <LoginTitle>{`${i18n.t("common.register")}`.toUpperCase()}</LoginTitle>
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "100%", margin: "24px 0", border: `1px solid ${theme.white30}` }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
