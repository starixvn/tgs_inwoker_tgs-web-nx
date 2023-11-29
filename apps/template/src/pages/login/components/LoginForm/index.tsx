import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/pages/login/components/LoginForm/RedirectToRegisterHint";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import { TitleContainer } from "@/components/styled-component/auth/AuthDialog";

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
  color: ${({ theme }) => theme.primary};
  font-size: 1.062rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
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

          <ForgotPasswordContainer onClick={handleClickForgotPassword}>
            {i18n.t("forgotPassword.title")}?
          </ForgotPasswordContainer>
        </FormSubContainer>
      </FormikForm>

      <RedirectToRegisterHint />
    </AuthFormContainer>
  );
};

export default LoginForm;
