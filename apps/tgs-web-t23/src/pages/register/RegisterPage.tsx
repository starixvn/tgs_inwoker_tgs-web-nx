import React from "react";
import RegisterForm from "@/pages/register/components/RegisterForm";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useRegisterPage } from "@/core/hooks/pages/register/useRegisterPage";

const RegisterPage = () => {
  useRegisterPage();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <RegisterForm />;
};

export default RegisterPage;
