import React from "react";
import { useAuth, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterFormStage";

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
      <RegisterFormStage currentStage={RegisterStageEnum.InitPhone} />
    </ProfileDialog>
  );
};

export default RegisterV2InitPhoneDialog;
