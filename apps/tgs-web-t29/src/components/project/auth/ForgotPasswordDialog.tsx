import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthDialog, useNotifications } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import BrandLogo from "@/components/project/BrandLogo";
import { TitleContainer } from "@/components/styled-component/auth/AuthDialog";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";

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
        <BrandLogo style={{ marginBottom: "62px" }} />
        {/*<TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>*/}
        {/*@ts-ignore*/}
        <ForgotPasswordPrev alert={alert} history={history} />
        <RedirectToLoginHint style={{ margin: "20px auto" }} />
        <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
      </AuthFormContainer>
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
