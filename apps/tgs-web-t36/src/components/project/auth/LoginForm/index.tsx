import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
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

  const Wrapper = styled.div`
    padding-top: 20px;
  `;

  const LoginHeader = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-end;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: cover;
  `;

  return (
    <Wrapper>
      {isMobileSize ? (
        <LoginHeader>
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

        <LanguageSwitch style={{ width: "150px", margin: "0 auto" }} />
      </AuthFormContainer>
    </Wrapper>
  );
};

export default LoginForm;
