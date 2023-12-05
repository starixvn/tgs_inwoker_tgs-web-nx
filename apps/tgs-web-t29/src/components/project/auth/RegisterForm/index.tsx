import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RedirectToLoginHint from "@/components/project/auth/RegisterForm/RedirectToLoginHint";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import RegisterFormStage from "@/components/project/auth/RegisterFormStage";
import CreatePlayerStage from "@/components/project/auth/RegisterFormStage/stage/CreatePlayerStage";

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

  return (
    <AuthFormContainer>
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "64px" }} />
      ) : (
        <LoginTitle>{`${i18n.t("common.register")}`.toUpperCase()}</LoginTitle>
      )}

      <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />

      <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
