import { useLoginForm } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { theme } from "@/theme";
import { ForgotPasswordContainer, RememberMeContainer } from "@/components/styled-component/auth/Form";

export const LoginMode = () => {
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
    <>
        <FormikForm
            formInputList={formInputConfigList}
            formik={formik}
            isLoading={isLoading}
            error={loginError}
            buttonText={i18n.t("common.login")}
        >
            <RememberMeContainer onClick={handleClickNeedToRemember}>
                <Checkbox
                checked={needToRemember}
                style={{
                    padding: "0px 5px 0px",
                    color: theme.white,
                }}
                />
                {i18n.t("wap.login.rememberMe")}
            </RememberMeContainer>
        </FormikForm>

        <ForgotPasswordContainer onClick={handleClickForgotPassword}>
            {i18n.t("forgotPassword.title")}
        </ForgotPasswordContainer>
    </>
  )
}