import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import React from "react";

import RegisterFormStage from "./RegisterFormStage";

const RegisterForm = () => {
  return (
    <AuthFormContainer>
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
