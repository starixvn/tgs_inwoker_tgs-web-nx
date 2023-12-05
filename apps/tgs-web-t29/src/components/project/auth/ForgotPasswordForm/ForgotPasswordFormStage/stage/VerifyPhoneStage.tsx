import React from "react";
import { useSnackbar } from "notistack";
import { useAuthDialog, useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import VerifyPhone from "@/components/project/auth/VerificationForm/VerfifyPhone";

const VerifyPhoneStage = () => {
  const { handleUpdateStage } = useForgotPasswordFormStage();
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitPhoneDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitPhoneDialog(false);
  };

  return (
    <VerifyPhone
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      handleUpdateStage={handleUpdateStage}
    />
  );
};

export default VerifyPhoneStage;
