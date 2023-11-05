import React from "react";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useLoginPage } from "@/core/hooks/pages/login/useLoginPage";
import LoginForm from "@/components/pages/login/components/LoginForm";

type Props = {};
const LoginPage = (props: Props) => {
  useLoginPage();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
