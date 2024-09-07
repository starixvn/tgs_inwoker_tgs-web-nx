import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
