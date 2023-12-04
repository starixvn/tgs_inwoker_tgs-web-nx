import React from "react";
import { useAuth, useAuthDialog } from "@tgs-web-nx/core/features";
import InitPhoneStage from "@/pages/register/components/RegisterFormStage/stage/InitPhoneStage";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2InitPhoneDialogOpen, handleToggleInitPhoneDialog } = useAuthDialog();
  const { handleLogout } = useAuth();

  const handleClose = async () => {
    handleToggleInitPhoneDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog
      open={isRegisterV2InitPhoneDialogOpen}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          padding: "28px 0",
          maxWidth: "550px",
        },
      }}
    >
      <InitPhoneStage />
    </ProfileDialog>
  );
};

export default RegisterV2InitPhoneDialog;
