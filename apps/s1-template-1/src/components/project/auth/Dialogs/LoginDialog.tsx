import LoginForm from "@/components/project/auth/LoginForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { media } from "@tgs-web-nx/constants";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
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

const ForgetPasswordFormContainer = styled.div`
  width: 100%;
`;

const LoginDialog = () => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  useDetectDialogClose(isLoginDialogOpen, () => handleToggleLoginDialog(false));

  return (
    <AuthDialog open={isLoginDialogOpen} onClose={() => handleToggleLoginDialog(false)}>
      <MainWrapper>
        <BannerContainer>
          <img
            src="/assets/images/auth/login-banner.png"
            alt="Login Banner"
            width={325}
            height={548}
          />
        </BannerContainer>
        <ForgetPasswordFormContainer>
          <LoginForm />
        </ForgetPasswordFormContainer>
      </MainWrapper>
    </AuthDialog>
  );
};

export default React.memo(LoginDialog);
