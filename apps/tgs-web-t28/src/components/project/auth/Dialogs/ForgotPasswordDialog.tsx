import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import BrandLogo from "../../BrandLogo";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
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

const LoginFormContainer = styled.div`
  width: 100%;
  min-height: 600px;
`;

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();
  useDetectDialogClose(isForgotPasswordDialogOpen, () => handleToggleForgotPasswordDialog(false));

  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
      <MainWrapper>
        <LogoImgContainer>
          <BrandLogo />
          <img src={treasureImg} alt="treasure" />
        </LogoImgContainer>
        <LoginFormContainer>
          <ForgotPasswordForm />
        </LoginFormContainer>
      </MainWrapper>
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
