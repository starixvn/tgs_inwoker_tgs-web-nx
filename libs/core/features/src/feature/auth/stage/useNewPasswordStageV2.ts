import { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService } from "@tgs-web-nx/core";
import {
  useAuthDialog,
  useEncryptPassword,
  useForgotPasswordNewPasswordFormikV2,
  useNotifications,
} from "../../../index";

export function useNewPasswordStageV2() {
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
      const resetPasswordResDto = await AccountService.ResetPassword(
        values.securityKey,
        values.verifyCode,
        newPwd,
      );

      if (resetPasswordResDto.IsSuccess) {
        alert("", i18n.t("forgotPassword.updateSuccess"));

        handleToggleForgotPasswordDialog(false);
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

  const handleSetLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const { formInputConfigList, formik } = useForgotPasswordNewPasswordFormikV2({
    handleClickSubmit,
  });

  return {
    formInputConfigList,
    formik,
    isLoading,
    handleSetLoading,
    forgotPasswordError,
  };
}
