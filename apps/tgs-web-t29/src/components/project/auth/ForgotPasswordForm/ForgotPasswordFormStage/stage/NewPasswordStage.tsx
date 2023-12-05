import React, { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import {
  useAuthDialog,
  useForgotPasswordFormStage,
  useForgotPasswordNewPasswordFormik,
  useNotifications,
} from "@tgs-web-nx/core/features";
import { AccountService } from "@tgs-web-nx/core";
import FormikForm from "@/components/project/FormikForm";

const NewPasswordStage = () => {
  const { code, securityKey } = useForgotPasswordFormStage();

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState<Error | null>(null);
  const { alert } = useNotifications();
  const { handleToggleLoginDialog, handleToggleForgotPasswordDialog } = useAuthDialog();

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

  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={forgotPasswordError}
      buttonText={i18n.t("common.submit")}
    />
  );
};

export default NewPasswordStage;
