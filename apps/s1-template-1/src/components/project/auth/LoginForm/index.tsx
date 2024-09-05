import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import FormikForm from "@/components/project/FormikForm";
import { ForgotPasswordContainer, FormSubContainer, RememberMeContainer } from "@/components/styled-component/auth/Form";
import { AuthFormContainer, FormContainer, LoginTitle } from "@/components/styled-component/AuthFormContainer";
import { Checkbox } from "@/components/UI/Checkbox";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  height: 44px;
  border-radius: 1rem;
  background: #1d2635;
`;

const CheckIcon = styled.div`
  content: "aaa";
  background: red;
  width: 20px;
  height: 20px;
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
      <Header>
        <LoginTitle>{i18n.t("common.login").toUpperCase()}</LoginTitle>

      </Header>

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
                icon={CheckIcon}
              />
              {i18n.t("wap.login.rememberMe")}
            </RememberMeContainer>

            <ForgotPasswordContainer onClick={handleClickForgotPassword}>
              {i18n.t("forgotPassword.title")}?
            </ForgotPasswordContainer>
          </FormSubContainer>
        </FormikForm>
      </FormContainer>

      <RedirectToRegisterHint style={{ marginBottom: "20px" }} />
    </AuthFormContainer>
  );
};

export default LoginForm;
