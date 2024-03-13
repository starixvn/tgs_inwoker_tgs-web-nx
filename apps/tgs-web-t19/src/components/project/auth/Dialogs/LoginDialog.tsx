import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import BrandLogo from "@/components/project/BrandLogo";
import logoBanner from "@/assets/t19/images/home/logo-banner.png";

const LogoImgContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-image: url(${logoBanner});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px 0 0 10px;
  padding: 50px;
`;

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  useDetectDialogClose(isLoginDialogOpen, () => handleToggleLoginDialog(false));

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <LogoImgContainer>
        <BrandLogo />
      </LogoImgContainer>
      <LoginForm />
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
