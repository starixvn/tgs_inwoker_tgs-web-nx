import React from "react";
import { useHistory } from "react-router-dom";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordPrev from "@/core/components/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

type Props = {};
const ForgotPasswordDialog = ({}: Props) => {
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
