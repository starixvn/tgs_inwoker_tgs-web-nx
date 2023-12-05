import React, { useEffect } from "react";
import { useAuthDialog, useRegisterForm } from "@tgs-web-nx/core/features";
import { useParams } from "react-router";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";

const RegisterPage = () => {
  const { playername } = useParams<{ playername: string }>();
  const { handleToggleRegisterDialog } = useAuthDialog();
  const { handleClickConfirmAdult } = useRegisterForm();

  useRegisterPage();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (playername && isDesktopSize) {
      handleToggleRegisterDialog(true);
      handleClickConfirmAdult();
    }
  }, []);

  if (isDesktopSize) {
    return null;
  }

  return <RegisterForm />;
};

export default RegisterPage;
