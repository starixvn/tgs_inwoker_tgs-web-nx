import React from "react";
import i18n from "@/utils/i18n";
import FormikForm from "@/components/project/FormikForm";
import Checkbox from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/pages/login/components/LoginForm/RedirectToRegisterHint";
import { useLoginForm } from "@/core/feature/useAuthForm/useLoginForm";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7.343vh 24px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;

const TitleContainer = styled.div`
  font-size: 3rem;
  line-height: 3.478rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  white-space: nowrap;

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
  color: ${({ theme }) => theme.primary};
  font-size: 1.062rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
`;

type Props = {};

const LoginForm = (props: Props) => {
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
    <LoginFormContainer>
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
    </LoginFormContainer>
  );
};

export default LoginForm;
