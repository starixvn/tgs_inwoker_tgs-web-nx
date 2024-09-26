import { media } from "@tgs-web-nx/constants";
import { useAuthDialog, useRedirectToLoginHint } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import ForgotPasswordForm from "@/components/project/auth/ForgotPasswordForm";
import { MainWrapper } from "@/components/styled-component/AuthFormContainer";
import { ArrowLeftIcon } from "@/components/UI/CustomizeIcon";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import AuthBanner from "@/components/UI/Dialog/AuthDialog/components/AuthBanner";

const ContentWrapper = styled.div`
  padding: 2.2rem 2.4rem;

  ${media.sm} {
    padding-top: 6.6rem;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
`;

const BackLoginButton = styled.div`
  display: flex;
  padding: 0.8rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.8rem;
  background: #2e353e;

  ${media.sm} {
    &:hover {
      cursor: pointer;
    }
  }
`;

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();
  useDetectDialogClose(isForgotPasswordDialogOpen, () => handleToggleForgotPasswordDialog(false));
  const { handleRedirect } = useRedirectToLoginHint();
  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
      <MainWrapper>
        <AuthBanner />
        <ContentWrapper>
          <Header>
            <BackLoginButton onClick={handleRedirect}>
              <ArrowLeftIcon
                className="icon"
                height={15}
                width={10}
                sx={{ width: "1rem", height: "1.5rem" }}
                viewBox="0 0 10 15"
              />
            </BackLoginButton>
            {i18n.t("web.resetPassword.title")}
          </Header>
          <ForgotPasswordForm />
        </ContentWrapper>
      </MainWrapper>
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
