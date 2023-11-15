import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { media } from "@/theme/breakpoints";

const BrandLogoContainer = styled.div`
  margin-bottom: 50px;

  ${media.sm} {
    margin-bottom: 30px;
  }
`;

const ForgotPasswordPage = () => {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthFormContainer>
      <BrandLogoContainer>
        <BrandLogo />
      </BrandLogoContainer>
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
