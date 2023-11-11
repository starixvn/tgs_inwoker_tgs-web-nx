import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthDialog, useNotifications } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";

const ForgotPasswordDialog = () => {
  const { isForgotPasswordDialogOpen, handleToggleForgotPasswordDialog } = useAuthDialog();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthDialog
      open={isForgotPasswordDialogOpen}
      onClose={() => handleToggleForgotPasswordDialog(false)}
      maxWidth={"lg"}
      style={{
        fontSize: "0.937rem !important",
      }}
    >
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
