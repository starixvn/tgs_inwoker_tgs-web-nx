import { useCallback, useEffect, useState } from "react";
import { FormikValues } from "formik";
import { useHistory } from "react-router-dom";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth } from "../useAuth";
import { useAuthDialog } from "../useAuthDialog";
import { useGenerateLoginFormik } from "./hooks/useGenerateLoginFormik";

export function useLoginForm() {
  const { loginState, handleLogin, clearLoginError } = useAuth();
  const [needToRemember, setNeedToRemember] = useState<boolean>(getNeedToRememberInitValue());
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
    [needToRemember],
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

  useEffect(() => {
    return () => {
      clearLoginError();
    };
  }, []);

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

function getNeedToRememberInitValue(): boolean {
  const remember = localStorage.getItem("remember");

  return remember === "true";
}
