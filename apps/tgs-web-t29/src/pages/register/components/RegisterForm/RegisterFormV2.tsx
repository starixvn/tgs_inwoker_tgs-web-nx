import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import RegisterFormStage from "@/pages/register/components/RegisterFormStage";
import { RegisterStageEnum } from "@/pages/register/components/RegisterFormStage/types";

const LoginTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.primary};
`;

const RegisterForm = () => {
  const { isMobileSize } = useRwd();
  const initialRegisterStage = RegisterStageEnum.CreatePlayer;

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "64px" }} />
      ) : (
        <LoginTitle>{i18n.t("common.register").toUpperCase()}</LoginTitle>
      )}

      <RegisterFormStage initialRegisterStage={initialRegisterStage} />

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
