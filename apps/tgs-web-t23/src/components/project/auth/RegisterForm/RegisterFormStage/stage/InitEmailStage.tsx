import React from "react";
import { useInitEmailStage } from "@tgs-web-nx/core/features";
import Email from "@/components/account/Profile/PrevComponents/Email";

const InitEmailStage = () => {
  const { handleCloseDialog, enqueueSnackbar } = useInitEmailStage();

  return (
    <Email
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
      isProceedRegisterV2={true}
    />
  );
};

export default InitEmailStage;
