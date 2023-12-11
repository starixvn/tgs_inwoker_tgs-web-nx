import React from "react";
import { useLoginPage, useRwd } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";
<<<<<<< develop
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";
=======
import { FormContainer } from "@/components/styled-component/AuthFormContainer";
>>>>>>> refactor: update auth structure

const LoginPage = () => {
  useLoginPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainer>
      <LoginForm />
    </FormContainer>
  );
};

export default LoginPage;
