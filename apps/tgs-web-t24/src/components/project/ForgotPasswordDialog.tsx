import React from "react";
import { useHistory } from "react-router-dom";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import ForgotPasswordPrev from "@/core/components/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useAuthDialog } from "@/core/feature/useAuthDialog";
import BrandLogo from "@/components/BrandLogo";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";

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
      <BrandLogo />
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />
    </AuthDialog>
  );
};

export default ForgotPasswordDialog;
