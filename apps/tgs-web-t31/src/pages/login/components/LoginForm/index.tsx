import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import FormikForm from "@/components/project/FormikForm";
import Checkbox from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/pages/login/components/LoginForm/RedirectToRegisterHint";
import { media } from "@/theme/breakpoints";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";

const TitleContainer = styled.div`
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.white};
  ${media.sm} {
    display: none;
  }
`;

const FormSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-size: 1.062rem;
  cursor: pointer;
  //margin: 8px 0;
`;

const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.white};
  font-size: 1.062rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: underline;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

  return (
    <AuthFormContainer>
      <TitleContainer>{i18n.t("common.login")}</TitleContainer>
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
        </FormSubContainer>
      </FormikForm>
      <RegisterContainer>
        <ForgotPasswordContainer onClick={handleClickForgotPassword}>
          {i18n.t("forgotPassword.title")}?
        </ForgotPasswordContainer>
        <RedirectToRegisterHint />
      </RegisterContainer>
    </AuthFormContainer>
  );
};

export default LoginForm;
