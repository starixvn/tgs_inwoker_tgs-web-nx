import React from "react";
import { useAuthContext, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2SetRealNameDialogOpen, handleToggleSetRealNameDialog } = useAuthDialog();
  const { handleLogout } = useAuthContext();

  const handleClose = async () => {
    handleToggleSetRealNameDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog open={isRegisterV2SetRealNameDialogOpen} onClose={handleClose}>
      <RegisterFormStage currentStage={RegisterStageEnum.SetRealName} />
    </ProfileDialog>
  );
};

export default RegisterV2InitPhoneDialog;
