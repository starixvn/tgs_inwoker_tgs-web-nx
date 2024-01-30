import React from "react";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { TitleContainer } from "@/components/styled-component/auth/Form";

const ForgotPasswordForm = () => {
  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <TitleContainer>
          {i18n.t("forgotPassword.title")}
          <div className="bottom-border" />
        </TitleContainer>

        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
