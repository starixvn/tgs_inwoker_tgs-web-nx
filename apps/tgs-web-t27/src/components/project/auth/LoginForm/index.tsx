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
import logoBg from "@/assets/t27/images/dialog/login-header-desktop.png";

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
    position: relative;
    display: flex;
    width: 100%;
    padding-top: 44%;
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
    font-size: 15.6px;
    font-weight: 700;
    color: ${({ theme }) => theme.white};
  `;

  return (
    <>
      {isMobileSize ? (
        <LoginHeader>
          <BrandLogoBg></BrandLogoBg>
          <BrandLogo style={{ maxHeight: "55px", zIndex: "1" }} />
        </LoginHeader>
      ) : (
        <BrandLogo style={{ maxHeight: "55px" }} />
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

        <LanguageSwitch style={{ width: "129px", margin: "0 auto" }} />
      </AuthFormContainer>
    </>
  );
};

export default LoginForm;
