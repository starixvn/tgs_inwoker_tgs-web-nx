import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import LoginToggleForm from "@/components/project/auth/LoginToggleForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  useDetectDialogClose(isLoginDialogOpen, () => handleToggleLoginDialog(false));

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <DialogContentWithBG>
        <LoginToggleForm mode="login" />
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
