import React from "react";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";
import { FormContainerWithBG } from "@/components/styled-component/AuthFormContainer";

const RegisterPage = () => {
  useRegisterPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return (
    <FormContainerWithBG>
      <RegisterForm />
    </FormContainerWithBG>
  );
};

export default RegisterPage;
