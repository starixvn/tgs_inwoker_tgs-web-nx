import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import BrandLogo from "@/components/project/BrandLogo";
import treasureImg from "@/assets/t28/images/account/treasureImg.png";

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LogoImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(199.8deg, #3219cc 2.15%, #7623b7 49%, #9f0963 100%);
  justify-content: center;
`;

const ForgetPasswordFormContainer = styled.div`
  width: 100%;
`;

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <MainWrapper>
        <LogoImgContainer>
          <BrandLogo />
          <img src={treasureImg} alt="treasure" />
        </LogoImgContainer>
        <ForgetPasswordFormContainer>
          <LoginForm />
        </ForgetPasswordFormContainer>
      </MainWrapper>
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
