import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import {
  ForgotPasswordContainer,
  FormSubContainer,
  RememberMeContainer,
} from "@/components/styled-component/auth/Form";
import styled from "styled-components";

const LoginForm = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    loginError,
    needToRemember,
    handleClickNeedToRemember,
    handleClickForgotPassword,
  } = useLoginForm();
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
          <Title>{i18n.t("common.login")}</Title>
        </LoginHeader>
      ) : (
        <Title>{i18n.t("common.login")}</Title>
      )}

      <AuthFormContainer>
        <FormContainer>
          <FormikForm
            formInputList={formInputConfigList}
            formik={formik}
            isLoading={isLoading}
            error={loginError}
            buttonText={i18n.t("common.login")}
          >
            <FormSubContainer>
              <RememberMeContainer onClick={handleClickNeedToRemember}>
                <Checkbox
                  checked={needToRemember}
                  style={{
                    padding: "0px 5px 0px",
                  }}
                />
                {i18n.t("wap.login.rememberMe")}
              </RememberMeContainer>

              <ForgotPasswordContainer onClick={handleClickForgotPassword}>
                {i18n.t("forgotPassword.title")}?
              </ForgotPasswordContainer>
            </FormSubContainer>
          </FormikForm>
        </FormContainer>

        <RedirectToRegisterHint />
        {isMobileSize && <LanguageSwitch style={{ width: "129px", margin: "0 auto" }} />}
      </AuthFormContainer>
    </>
  );
};

export default LoginForm;
