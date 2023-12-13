import React from "react";
import { useLoginPage, useRwd } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";

const LoginPage = () => {
  useLoginPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
