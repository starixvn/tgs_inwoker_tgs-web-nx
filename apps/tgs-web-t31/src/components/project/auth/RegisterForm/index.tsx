import React from "react";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const RegisterForm = () => {
  return (
    <AuthFormContainer>
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>
      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
