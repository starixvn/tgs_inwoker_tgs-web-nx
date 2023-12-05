import React from "react";
import { useSnackbar } from "notistack";
import { useAuthDialog, useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import { ForgotPasswordStageEnum, ValueOf } from "@tgs-web-nx/types";
import VerifyEmail from "@/components/project/auth/VerificationForm/VerifyEmail";

const VerifyEmailStage = () => {
  const { handleUpdateStage } = useForgotPasswordFormStage();

  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitEmailDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitEmailDialog(false);
  };

  return (
    <VerifyEmail
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      handleUpdateStage={handleUpdateStage}
    />
  );
};

export default VerifyEmailStage;
