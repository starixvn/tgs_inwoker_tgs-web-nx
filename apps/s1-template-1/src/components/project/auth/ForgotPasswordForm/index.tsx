import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";

import ForgotPasswordFormStage from "./ForgotPasswordFormStage";

const ForgotPasswordForm = () => {
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <LanguageSwitch />
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
