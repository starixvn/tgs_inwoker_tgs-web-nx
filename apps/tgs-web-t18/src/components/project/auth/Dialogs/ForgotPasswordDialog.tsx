import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();
  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
      <DialogContentWithBG>
        <ForgotPasswordForm />
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
