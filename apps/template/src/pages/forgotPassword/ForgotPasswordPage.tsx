import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { TitleContainer } from "@/components/styled-component/auth/AuthDialog";

const ForgotPasswordPage = () => {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthFormContainer>
      <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
