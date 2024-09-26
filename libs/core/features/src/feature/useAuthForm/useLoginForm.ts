import { useRwd } from "@tgs-web-nx/core/hooks";
import { FormikValues } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "../useAuth";
import { useAuthDialog } from "../useAuthDialog/hooks/useAuthDialog";
import { useGenerateLoginFormik } from "./hooks/useGenerateLoginFormik";

// eslint-disable-next-line @nx/enforce-module-boundaries
export function useLoginForm() {
  const { loginState, handleLogin, handleLoginGoogle, clearLoginError } = useAuthContext();
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
        handleToggleLoginDialog(false);
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
    handleToggleLoginDialog(false);
    handleToggleForgotPasswordDialog(true);
  };

  useEffect(() => {
    return () => {
      clearLoginError();
    };
  }, []);

  return {
    formInputConfigList,
    handleLoginGoogle,
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
