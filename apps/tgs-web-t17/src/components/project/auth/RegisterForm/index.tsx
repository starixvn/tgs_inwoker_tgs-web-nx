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
      {isMobileSize ? (
        <LoginHeader>
          <Title>{i18n.t("common.register")}</Title>
        </LoginHeader>
      ) : (
        <Title>{i18n.t("common.register")}</Title>
      )}

      <AuthFormContainer>
        <FormContainer>
          <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
        </FormContainer>

        <RedirectToLoginHint />
        {isMobileSize && <LanguageSwitch style={{ width: "129px", margin: "0 auto" }} />}
      </AuthFormContainer>
    </>
  );
};

export default React.memo(RegisterForm);
