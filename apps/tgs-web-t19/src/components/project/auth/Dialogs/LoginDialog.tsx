import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { LoginAd } from "@/components/styled-component/LoginAd";

const DialogLoginContainer = styled.div`
  width: 100%;
  margin: auto;
  max-height: 760px;
  z-index: 2;
  overflow: auto;
  display: flex;
  align-items: center;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }
`;

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <LoginForm />
      {/* <DialogLoginContainer>
        <LoginAd />
      </DialogLoginContainer> */}
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
