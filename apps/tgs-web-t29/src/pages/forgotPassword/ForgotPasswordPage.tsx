import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const TitleWrapper = styled.div``;

const ForgotPasswordPage = () => {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  return (
    <AuthFormContainer>
      <TitleWrapper>
        <BrandLogo style={{ marginBottom: "72px" }} />
      </TitleWrapper>

      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />

      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
