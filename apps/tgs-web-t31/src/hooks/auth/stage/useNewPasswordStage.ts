import { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService } from "@tgs-web-nx/core";
import {
  useAuthDialog,
  useForgotPasswordFormStage,
  useForgotPasswordNewPasswordFormik,
  useNotifications,
} from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";

export function useNewPasswordStage() {
  const { code, securityKey } = useForgotPasswordFormStage();

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState<Error | null>(null);
  const { alert } = useNotifications();
  const { handleToggleLoginDialog, handleToggleForgotPasswordDialog } = useAuthDialog();
  const history = useHistory();

  const handleClickSubmit = async (values: any) => {
    const { pwd, confirmPwd } = values;
    if (pwd !== confirmPwd) {
      alert("", i18n.t("forgotPassword.invalidConfirmPass"));
    }
    try {
      setIsLoading(true);

      const resetPasswordResDto = await AccountService.ResetPassword(securityKey, code, pwd);

      if (resetPasswordResDto.IsSuccess) {
        alert("", i18n.t("forgotPassword.updateSuccess"));
        history.push("/login");
        // handleToggleForgotPasswordDialog(false);
        // handleToggleLoginDialog(true);
      } else {
        alert("", resetPasswordResDto?.info || "");
      }
    } catch (error: any) {
      console.error(error);
      setForgotPasswordError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { formInputConfigList, formik } = useForgotPasswordNewPasswordFormik({
    handleClickSubmit,
  });

  return {
    formInputConfigList,
    formik,
    isLoading,
    forgotPasswordError,
  };
}
