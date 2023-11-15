import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthDialog, useNotifications } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import BrandLogo from "@/components/project/BrandLogo";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import { media } from "@/theme/breakpoints";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const BrandLogoContainer = styled.div`
  margin-bottom: 50px;

  ${media.sm} {
    margin-bottom: 30px;
  }
`;

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
    >
      <AuthFormContainer>
        <BrandLogoContainer>
          <BrandLogo />
        </BrandLogoContainer>
        {/*@ts-ignore*/}
        <ForgotPasswordPrev alert={alert} history={history} />
        <RedirectToLoginHint style={{ marginTop: "20px" }} />
        <LanguageSwitch style={{ width: "129px", margin: "69px auto 0" }} />
      </AuthFormContainer>
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
