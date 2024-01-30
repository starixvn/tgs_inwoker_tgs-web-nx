import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import RegisterForm from "@/components/project/auth/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
import AuthSwitchButtons from "@/components/project/auth/AuthSwitchButtons";

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <AuthSwitchButtons activeAuthStep={"register"} />
      <RegisterForm />
    </AuthDialog>
  );
};

export default RegisterDialog;
