import React from "react";
import { useSnackbar } from "notistack";
import Phone from "@/components/account/Profile/PrevComponents/Phone";

const InitPhoneStage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleCloseDialog = () => {
    console.log("handleCloseDialog in phone");
  };

  return <Phone handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default InitPhoneStage;
