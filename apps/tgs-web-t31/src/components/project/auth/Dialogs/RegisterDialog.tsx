import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import RegisterForm from "@/components/project/auth/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
<<<<<<< develop
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
=======
>>>>>>> checkpoint

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
<<<<<<< develop
      <DialogContentWithBG>
        <RegisterForm />
      </DialogContentWithBG>
=======
      <RegisterForm />
>>>>>>> checkpoint
    </AuthDialog>
  );
};

export default RegisterDialog;
