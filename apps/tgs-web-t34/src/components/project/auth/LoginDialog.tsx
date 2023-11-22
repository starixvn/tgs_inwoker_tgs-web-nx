import React from "react";
import { useAuthDialog, useRoute } from "@tgs-web-nx/core/features";
import LoginForm from "@/pages/login/components/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  const { route } = useRoute();

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <LoginForm />
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
