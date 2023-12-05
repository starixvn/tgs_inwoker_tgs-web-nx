import React from "react";
import { useVerifyPhone } from "@tgs-web-nx/core/features";
import VerifyPhone from "@/components/project/auth/VerificationForm/VerfifyPhone";

const VerifyPhoneStage = () => {
  const { handleCloseDialog, enqueueSnackbar, handleUpdateStage } = useVerifyPhone();

  return (
    <VerifyPhone
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      handleUpdateStage={handleUpdateStage}
    />
  );
};

export default VerifyPhoneStage;
