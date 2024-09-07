import FormikForm from "@/components/project/FormikForm";
import { ForgotPasswordContainer, FormSubContainer, RememberMeContainer } from "@/components/styled-component/auth/Form";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import { Checkbox } from "@/components/UI/Checkbox";
import { useLoginForm, useRedirectToRegisterHint } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";

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
  const { handleRedirect } = useRedirectToRegisterHint();

  return (
    <AuthFormContainer>
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
                padding: "0 0.5rem 0",
              }}
            />
            {i18n.t("wap.login.rememberMe")}
          </RememberMeContainer>

          <ForgotPasswordContainer onClick={handleClickForgotPassword}>
            {i18n.t("forgotPassword.title")}?
          </ForgotPasswordContainer>
        </FormSubContainer>
      </FormikForm>
    </AuthFormContainer>
  );
};

export default LoginForm;
