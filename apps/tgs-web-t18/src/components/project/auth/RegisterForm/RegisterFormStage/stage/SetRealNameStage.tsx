import React from "react";
import { useNotifications, useSetRealNameStage } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import NameVerify from "@/components/account/Profile/PrevComponents/NameVerify";

const InitPhoneStage = () => {
  const { handleCloseDialog, enqueueSnackbar } = useSetRealNameStage();
  const { alert } = useNotifications();
  const history = useHistory();
  
  return (
    <NameVerify
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default InitPhoneStage;
