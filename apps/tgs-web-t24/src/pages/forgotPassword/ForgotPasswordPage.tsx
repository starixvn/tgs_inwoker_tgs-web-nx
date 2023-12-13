import React from "react";
import { useForgotPasswordPage, useRwd } from "@tgs-web-nx/core/hooks";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  useForgotPasswordPage();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return null;
  }

  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
