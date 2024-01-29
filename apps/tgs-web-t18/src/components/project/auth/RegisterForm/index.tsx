import React from "react";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { TitleContainer } from "@/components/styled-component/auth/Form";

const RegisterForm = () => {
  return (
    <AuthFormContainer>
      <TitleContainer>
        {i18n.t("common.register")}
        <div className="bottom-border" />
      </TitleContainer>

      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
