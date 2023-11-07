import React from "react";
import LoginForm from "@/pages/login/components/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

type Props = {};
const LoginDialog = ({}: Props) => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <LoginForm />
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
