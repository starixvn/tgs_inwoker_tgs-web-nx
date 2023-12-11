import React from "react";
import { useLoginPage, useRwd } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";
import { FormContainer } from "@/components/styled-component/AuthFormContainer";

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
