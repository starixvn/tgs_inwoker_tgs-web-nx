import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { useHistory } from "react-router";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import {
  ForgotPasswordContainer,
  FormSubContainer,
  RememberMeContainer,
} from "@/components/styled-component/auth/Form";
import checkedImg from "@/assets/t31/images/auth/checked.svg";
import uncheckedImg from "@/assets/t31/images/auth/uncheck.svg";

const HintContainer = styled.div`
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
  } = useLoginForm();
  const history = useHistory();

  const { isMobileSize } = useRwd();
  const handleClickForgetPassword = () => {
    history.push("/forgot-password");
  };
  return (
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
                icon={<img src={uncheckedImg} alt="uncheck" />}
                checkedIcon={<img src={checkedImg} alt="checked" />}
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
      {isMobileSize ? (
        <HintContainer>
          <ForgotPasswordContainer onClick={() => handleClickForgetPassword()}>
            {i18n.t("forgotPassword.title")}
          </ForgotPasswordContainer>
          <RedirectToRegisterHint style={{ marginBottom: "20px" }} />
        </HintContainer>
      ) : (
        <HintContainer>
          <RedirectToRegisterHint style={{ marginBottom: "20px" }} />
          <ForgotPasswordContainer onClick={() => handleClickForgetPassword()}>
            {i18n.t("forgotPassword.title")}
          </ForgotPasswordContainer>
        </HintContainer>
      )}

      <LanguageSwitch style={{ width: "129px", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default LoginForm;
