import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import RegisterForm from "@/components/project/auth/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import AuthSwitchButtons from "@/components/project/auth/AuthSwitchButtons";

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterDialogOpen, () => handleToggleRegisterDialog(false));

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <AuthSwitchButtons activeAuthStep={"register"} />
      <RegisterForm />
    </AuthDialog>
  );
};

export default RegisterDialog;
