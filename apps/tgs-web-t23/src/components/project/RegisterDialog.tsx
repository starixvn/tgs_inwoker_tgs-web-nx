import React from "react";
import RegisterForm from "@/pages/register/components/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <RegisterForm />
    </AuthDialog>
  );
};

export default RegisterDialog;
