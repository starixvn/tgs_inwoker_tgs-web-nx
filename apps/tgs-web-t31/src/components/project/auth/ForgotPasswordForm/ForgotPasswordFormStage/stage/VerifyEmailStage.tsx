import React from "react";
import { useVerifyEmail } from "@tgs-web-nx/core/features";
import VerifyEmail from "@/components/project/auth/VerificationForm/VerifyEmail";

const VerifyEmailStage = () => {
  const { handleCloseDialog, enqueueSnackbar, handleUpdateStage } = useVerifyEmail();

  return (
    <VerifyEmail
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      handleUpdateStage={handleUpdateStage}
    />
  );
};

export default VerifyEmailStage;
