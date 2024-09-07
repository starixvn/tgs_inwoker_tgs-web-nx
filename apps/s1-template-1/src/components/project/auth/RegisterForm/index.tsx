import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { useRedirectToLoginHint } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import React from "react";

import RegisterFormStage from "./RegisterFormStage";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();
  const { handleRedirect } = useRedirectToLoginHint();

  return (
    <AuthFormContainer>
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
