import React from "react";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";
<<<<<<< develop
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";
=======
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
>>>>>>> refactor: update auth structure

const RegisterPage = () => {
  useRegisterPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainer>
      <RegisterForm />
    </FormContainer>
  );
};

export default RegisterPage;
