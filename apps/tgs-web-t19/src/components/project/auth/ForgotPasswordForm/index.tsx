import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ForgotPasswordStageContextProvider } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import ForgotPasswordFormStage from "./ForgotPasswordFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  background: linear-gradient(180deg, rgba(51, 41, 28, 0.8) 0%, #1F1F1F 100%);
  border-radius: 20px;
  padding: 24px 22px 24px 22px;
  box-shadow: 0px 0px 8px 0px #595634 inset;
`;

const ForgotPasswordForm = () => {
  const { isMobileSize } = useRwd();

  return (
    <ForgotPasswordStageContextProvider>
      <AuthFormContainer>
        {isMobileSize &&
          <>
            <BrandLogo style={{ maxHeight: "54px" }} />
            <LoginWrapper>
              <FormContainer>
                <ForgotPasswordFormStage />
              </FormContainer>
              <RedirectToLoginHint />
              <LanguageSwitch style={{ width: "100%" }} />
            </LoginWrapper>
          </>
        }
        {
          !isMobileSize &&
          <>
            <LoginTitle>{`${i18n.t("forgotPassword.title")}`}</LoginTitle>
            <FormContainer>
              <ForgotPasswordFormStage />
            </FormContainer>
            <RedirectToLoginHint />
          </>
        }
      </AuthFormContainer>
    </ForgotPasswordStageContextProvider>
  );
};

export default React.memo(ForgotPasswordForm);
