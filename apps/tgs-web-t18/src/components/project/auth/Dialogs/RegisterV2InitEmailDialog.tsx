import React from "react";
import { useAuthContext, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";

const RegisterV2InitEmailDialog = () => {
  const { isRegisterV2InitEmailDialogOpen, handleToggleInitEmailDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterV2InitEmailDialogOpen, () => handleClose());

  const { handleLogout } = useAuthContext();

  const handleClose = async () => {
    handleToggleInitEmailDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog open={isRegisterV2InitEmailDialogOpen} onClose={() => handleClose()}>
      <RegisterFormStage currentStage={RegisterStageEnum.InitEmail} />
    </ProfileDialog>
  );
};

export default RegisterV2InitEmailDialog;
