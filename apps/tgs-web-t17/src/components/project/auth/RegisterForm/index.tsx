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
import styled from "styled-components";
import BrandLogo from "@/components/project/BrandLogo";

const RegisterForm = () => {
  const { isMobileSize } = useRwd();

  const LoginHeader = styled.div`
    padding: 125px 24px 24px;
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
      <AuthFormContainer>
        {isMobileSize ? (
          <BrandLogo style={{ marginBottom: "64px", maxWidth: "none" }} />
        ) : (
          <LoginTitle>{i18n.t("common.register").toUpperCase()}</LoginTitle>
        )}
        <FormContainer>
          <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
        </FormContainer>

        <RedirectToLoginHint />
        {isMobileSize && <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />}
      </AuthFormContainer>
    </>
  );
};

export default React.memo(RegisterForm);
