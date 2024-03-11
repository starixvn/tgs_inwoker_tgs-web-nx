import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import { AuthFormContainer, FormContainer, LoginTitle } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import {
  ForgotPasswordContainer,
  FormSubContainer,
  RememberMeContainer,
} from "@/components/styled-component/auth/Form";
import { theme } from "@/theme";
import BrandLogo from "@/components/project/BrandLogo";

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
      <BrandLogo style={{ marginBottom: "64px", maxWidth: "none" }} />
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

      <ForgotPasswordContainer onClick={handleClickForgotPassword}>
        {i18n.t("forgotPassword.title")}?
      </ForgotPasswordContainer>

      <LanguageSwitch
        style={{
          width: "100%",
          margin: "auto auto 20px",
          borderBottom: `1px solid ${theme.black}`,
        }}
      />
      <RedirectToRegisterHint style={{ marginBottom: "20px" }} />
    </AuthFormContainer>
  );
};

export default LoginForm;
