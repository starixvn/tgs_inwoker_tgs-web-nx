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
      {isMobileSize &&
        <>
          <BrandLogo style={{ maxHeight: "54px" }} />
          <LoginWrapper>
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
            <LanguageSwitch
              style={{ width: "100%" }}
            />
          </LoginWrapper>
        </>
      }

      {!isMobileSize &&
        <>
          <LoginTitle>{i18n.t("common.login")}</LoginTitle>
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
        </>
      }
    </AuthFormContainer>
  );
};

export default LoginForm;
