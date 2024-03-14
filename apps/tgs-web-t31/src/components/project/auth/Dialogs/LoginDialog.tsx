import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  useDetectDialogClose(isLoginDialogOpen, () => handleToggleLoginDialog(false));

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <DialogContentWithBG>
        <LoginForm />
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
