import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { ActiveTab, AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";

import RegisterFormStage from "./RegisterFormStage";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "50px", maxWidth: "none" }} />
      ) : (
        <ActiveTab>{i18n.t("common.register").toUpperCase()}</ActiveTab>
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
