import React from "react";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/pages/register/components/RegisterForm";

const RegisterPage = () => {
  useRegisterPage();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <RegisterForm />;
};

export default RegisterPage;
