import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import React from "react";

import ForgotPasswordFormStage from "./ForgotPasswordFormStage";

const ForgotPasswordForm = () => {
  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
