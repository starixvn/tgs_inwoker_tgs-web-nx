import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
<<<<<<< develop
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
=======
>>>>>>> checkpoint

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();
  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
<<<<<<< develop
      <DialogContentWithBG>
        <ForgotPasswordForm />
      </DialogContentWithBG>
=======
      <ForgotPasswordForm />
>>>>>>> checkpoint
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
