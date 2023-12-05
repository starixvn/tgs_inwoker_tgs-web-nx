import React from "react";
import { useSnackbar } from "notistack";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import InitPhone from "@/components/project/auth/VerificationForm/InitPhone";

const InitPhoneStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitPhoneDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitPhoneDialog(false);
  };

  return <InitPhone handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default InitPhoneStage;
