import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import {
  AuthFormContainer,
  LoginTitle,
  FormContainer,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import logoBg from "@/assets/t27/images/dialog/login-header-desktop.png";
import styled from "styled-components";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  const LoginHeader = styled.div`
  position: relative;
    display: flex;
    width: 100%;
    height: 33%;
    padding: 20px 0;
    justify-content: center;
    align-items: flex-end;
    flex-shrink: 0;
    background-image: url(${logoBg});
    background-repeat: no-repeat;
    background-size: cover;
  `;

  const BrandLogoBg = styled.div`
    position: absolute;
    width: 100%;
    height:40%;
    left: 0;
    bottom: 0;
    background: linear-gradient(0deg,rgb(36 38 43),rgb(25 25 25 / 70%),rgb(115 115 115 / 0%));
  `;

  const Title = styled(LoginTitle)`
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.white};
    text-align: center; 
  `;

  return (
    <>
      {isMobileSize ? (
        <LoginHeader>
          <BrandLogoBg></BrandLogoBg>
          <BrandLogo style={{ maxHeight: "55px", zIndex: "1" }} />
        </LoginHeader>
      ) : (
        <Title>{i18n.t("common.register")}</Title>
      )}

      <AuthFormContainer>
        <FormContainer>
          <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
      </AuthFormContainer>
    </>
  );
};

export default React.memo(RegisterForm);
