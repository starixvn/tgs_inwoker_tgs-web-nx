import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import LoginToggleForm from "@/components/project/auth/LoginToggleForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  
  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <DialogContentWithBG>
        <LoginToggleForm mode="login"/>
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
