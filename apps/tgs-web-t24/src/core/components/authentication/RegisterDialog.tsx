import React from "react";
import RegisterForm from "@/components/pages/register/components/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

type Props = {};
const RegisterDialog = ({}: Props) => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <RegisterForm />
    </AuthDialog>
  );
};

export default RegisterDialog;
