import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
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

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();
  useDetectDialogClose(isForgotPasswordDialogOpen, () => handleToggleForgotPasswordDialog(false));

  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
      <LogoImgContainer>
        <BrandLogo />
      </LogoImgContainer>
      <ForgotPasswordForm />
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
