import React from "react";
import { useLoginPage, useRwd } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/pages/login/components/LoginForm";

const LoginPage = () => {
  useLoginPage();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
