import React from "react";
import { useAuth, useAuthDialog } from "@tgs-web-nx/core/features";
import InitEmailStage from "@/pages/register/components/RegisterFormStage/stage/InitEmailStage";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";

const RegisterV2InitEmailDialog = () => {
  const { isRegisterV2InitEmailDialogOpen, handleToggleInitEmailDialog } = useAuthDialog();
  const { handleLogout } = useAuth();

  const handleClose = async () => {
    handleToggleInitEmailDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog
      open={isRegisterV2InitEmailDialogOpen}
      onClose={() => handleClose()}
      sx={{
        "& .MuiPaper-root": {
          padding: "28px 0",
          maxWidth: "550px",
        },
      }}
    >
      <InitEmailStage />
    </ProfileDialog>
  );
};

export default RegisterV2InitEmailDialog;
