import { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService } from "@tgs-web-nx/core";
import { enqueueSnackbar } from "notistack";
import {
  useAuthDialog,
  useEncryptPassword,
  useForgotPasswordFormStage,
  useForgotPasswordNewPasswordFormik,
  useNotifications,
} from "../../../index";

export function useNewPasswordStage() {
  const { code, securityKey } = useForgotPasswordFormStage();

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState<Error | null>(null);
  const { alert } = useNotifications();
  const { handleToggleLoginDialog, handleToggleForgotPasswordDialog } = useAuthDialog();
  const {encryptPassword} = useEncryptPassword();

  const handleClickSubmit = async (values: any) => {
    const { pwd, confirmPwd } = values;
    if (pwd !== confirmPwd) {
      alert("", i18n.t("forgotPassword.invalidConfirmPass"));
    }
    try {
      setIsLoading(true);
      const newPwd = encryptPassword(pwd);
      const resetPasswordResDto = await AccountService.ResetPassword(securityKey, code, newPwd);

      if (resetPasswordResDto.IsSuccess) {
        // it seems unnecessary to show alert here, use notistack instead
        // alert("", i18n.t("forgotPassword.updateSuccess"));

        enqueueSnackbar(i18n.t("forgotPassword.updateSuccess"), {
          variant: "success",
        });

        handleToggleForgotPasswordDialog(false);
        handleToggleLoginDialog(true);
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
