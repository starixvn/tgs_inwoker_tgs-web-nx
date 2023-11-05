import { useCallback, useState } from "react";
import { FormikValues } from "formik";
import { useGenerateLoginFormik } from "@/core/feature/useAuthForm/hooks/useGenerateLoginFormik";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useHistory } from "react-router";
import { useAuth } from "@/core/feature/useAuth";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

export function useLoginForm() {
  const { loginState, handleLogin } = useAuth();
  const [needToRemember, setNeedToRemember] = useState(false);
  const { handleToggleLoginDialog, handleToggleForgotPasswordDialog } = useAuthDialog();
  const { isDesktopSize } = useRwd();
  const handleClickNeedToRemember = () => {
    setNeedToRemember((prevState) => !prevState);
  };
  const history = useHistory();

  // ===== handle click login =====
  const handleClickLogin = useCallback(
    async (values: FormikValues) => {
      try {
        const { username, password } = values;
        await handleLogin(username, password, needToRemember);

        if (isDesktopSize) {
          handleToggleLoginDialog(false);
        }
      } catch (error: any) {
        console.error(error);
      }
    },
    [needToRemember]
  );

  const { formInputConfigList, formik } = useGenerateLoginFormik({
    handleClickSubmit: handleClickLogin,
  });

  const handleClickForgotPassword = () => {
    if (isDesktopSize) {
      handleToggleLoginDialog(false);
      handleToggleForgotPasswordDialog(true);
      return;
    }

    history.push("/forgot-password");
  };

  return {
    formInputConfigList,
    formik,
    isLoading: loginState.isLoading,
    loginError: loginState.error,
    needToRemember,
    handleClickNeedToRemember,
    handleClickForgotPassword,
  };
}
