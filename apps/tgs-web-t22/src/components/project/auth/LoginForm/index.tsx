import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
  RedirectWrapper,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
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

  return (
    <AuthFormContainer>
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
          </FormSubContainer>
        </FormikForm>
      </FormContainer>
      
      <RedirectWrapper style={{marginBottom: "36px"}}>
        <ForgotPasswordContainer onClick={handleClickForgotPassword} style={{margin: 0}}>
          {i18n.t("forgotPassword.title")}
        </ForgotPasswordContainer>
        <RedirectToRegisterHint style={{justifyContent: "flex-end"}}/>
      </RedirectWrapper>
      <LanguageSwitch style={{ width: "100%", margin: "auto auto 0" }} />
    </AuthFormContainer>
  );
};

export default LoginForm;
