import { i18n } from "@tgs-web-nx/utils";
import { useLoginForm } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { AccountService } from "@tgs-web-nx/core";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/project/auth/RedirectToRegisterHint";
import {
  AuthFormContainer,
  FormContainer,
  LoginTitle,
} from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import {
  ForgotPasswordContainer,
  FormSubContainer,
  RememberMeContainer,
} from "@/components/styled-component/auth/Form";
import BrandLogo from "@/components/project/BrandLogo";

const LoginForm = () => {
  const {
    formInputConfigList,
    handleLoginGoogle,
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
      {isMobileSize ? (
        <BrandLogo style={{ marginBottom: "50px", maxWidth: "none" }} />
      ) : (
        <LoginTitle>{i18n.t("common.login").toUpperCase()}</LoginTitle>
      )}
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

      <RedirectToRegisterHint style={{ marginBottom: "20px" }} />

      <GoogleOAuthProvider clientId="1047762405070-iv1v8c4iuu9i1vgjifeem9evd7vqgfi0.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(response: any) => {handleLoginGoogle(response.credential)}}
          onError={()=>{ alert('Failed to login.')}} />
      </GoogleOAuthProvider>
      <LanguageSwitch />
    </AuthFormContainer>
  );
};

export default LoginForm;
