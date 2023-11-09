import React from "react";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useLoginPage } from "@/core/hooks/pages/login/useLoginPage";
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
