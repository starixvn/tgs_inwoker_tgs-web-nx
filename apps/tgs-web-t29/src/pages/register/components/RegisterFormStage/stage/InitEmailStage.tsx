import React from "react";
import { useSnackbar } from "notistack";
import Email from "@/components/account/Profile/PrevComponents/Email";

const InitEmailStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleCloseDialog = () => {
    console.log("handleCloseDialog in email");
  };

  return <Email handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default InitEmailStage;
