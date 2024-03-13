import React from "react";
import { useAuthContext, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";

const RegisterV2SetRealNameDialog = () => {
  const { isRegisterV2SetRealNameDialogOpen, handleToggleSetRealNameDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterV2SetRealNameDialogOpen, () => handleClose());

  const { handleLogout } = useAuthContext();

  const handleClose = async () => {
    handleToggleSetRealNameDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog
      open={isRegisterV2SetRealNameDialogOpen}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          padding: "28px 0",
          maxWidth: "550px",
        },
      }}
    >
      <RegisterFormStage currentStage={RegisterStageEnum.SetRealName} />
    </ProfileDialog>
  );
};

export default RegisterV2SetRealNameDialog;
