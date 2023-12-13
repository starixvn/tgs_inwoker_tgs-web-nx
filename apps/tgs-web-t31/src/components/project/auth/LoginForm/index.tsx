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
import { theme } from "@/theme";

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
  const { isMobileSize } = useRwd();

  return (
    <AuthFormContainer>
      <LoginTitle>{i18n.t("common.login").toUpperCase()}</LoginTitle>

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
          </FormSubContainer>
        </FormikForm>
      </FormContainer>

      <RegisterContainer>
        <ForgotPasswordContainer onClick={handleClickForgotPassword}>
          {i18n.t("forgotPassword.title")}?
        </ForgotPasswordContainer>
        <RedirectToRegisterHint />
      </RegisterContainer>

      <LanguageSwitch style={{ width: "100%", margin: "24px 0", border: `1px solid ${theme.white30}` }} />
    </AuthFormContainer>
  );
};

export default LoginForm;
