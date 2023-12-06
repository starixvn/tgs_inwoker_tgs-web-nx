import React from "react";
import { useInitPhoneStage } from "@tgs-web-nx/core/features";
import InitPhone from "@/components/project/auth/VerificationForm/InitPhone";

const InitPhoneStage = () => {
  const { handleCloseDialog, enqueueSnackbar } = useInitPhoneStage();

  return <InitPhone handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default InitPhoneStage;
