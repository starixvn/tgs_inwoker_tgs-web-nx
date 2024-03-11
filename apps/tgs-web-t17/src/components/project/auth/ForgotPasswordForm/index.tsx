import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import styled from "styled-components";
import logoBg from "@/assets/t27/images/dialog/login-header-desktop.png";

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  const LoginHeader = styled.div`
     padding: 125px 24px 24px;
  `;

  const Title = styled(LoginTitle)`
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.white};
    text-align: center;
    text-wrap: wrap;
`;

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "64px", maxWidth: "none" }} />
        ) : (
          <LoginTitle>{i18n.t("forgotPassword.title").toUpperCase()}</LoginTitle>
        )}
        <FormContainer>
          <ForgotPasswordFormStage />
        </FormContainer>

        <RedirectToLoginHint />
        {isMobileSize && <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />}
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
