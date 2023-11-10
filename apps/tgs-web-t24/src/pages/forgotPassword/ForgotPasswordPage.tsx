import React from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/core/utils/i18n";
import ForgotPasswordPrev from "@/core/components/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/BrandLogo";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";

const ForgotPasswordPage = () => {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthFormContainer>
      <BrandLogo />
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
