import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <LoginForm />
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
