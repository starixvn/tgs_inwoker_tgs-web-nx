import React from "react";
import { useSnackbar } from "notistack";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import Phone from "@/components/account/Profile/PrevComponents/Phone";

const VerifyPhoneStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitPhoneDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitPhoneDialog(false);
  };

  return (
    <Phone
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      isProceedRegisterV2={true}
    />
  );
};

export default VerifyPhoneStage;
