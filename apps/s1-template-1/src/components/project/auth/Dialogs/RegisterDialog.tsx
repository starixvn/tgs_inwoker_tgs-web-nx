import RegisterForm from "@/components/project/auth/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { media } from "@tgs-web-nx/constants";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ${media.sm} {
    display: grid;
    grid-template-columns: 32.5rem 1fr;
    grid-template-rows: 54.8rem;
  }
`;

const BannerContainer = styled.div`
  display: none;

  ${media.sm} {
    display: flex;
    flex-direction: column;
    background: linear-gradient(199.8deg, #3219cc 2.15%, #7623b7 49%, #9f0963 100%);
    justify-content: center;
  }
`;

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterDialogOpen, () => handleToggleRegisterDialog(false));

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <Wrapper>
        <BannerContainer>
          <img src="/assets/images/auth/login-banner.png" alt="Login Banner" />
        </BannerContainer>
        <RegisterForm />
      </Wrapper>
    </AuthDialog>
  );
};

export default RegisterDialog;
