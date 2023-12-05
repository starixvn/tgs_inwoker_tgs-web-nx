import React from "react";
import { useSnackbar } from "notistack";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import Email from "@/components/account/Profile/PrevComponents/Email";

const InitEmailStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitEmailDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitEmailDialog(handleToggleInitEmailDialog);
  };

  return (
    <Email
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      isProceedRegisterV2={true}
    />
  );
};

export default InitEmailStage;
