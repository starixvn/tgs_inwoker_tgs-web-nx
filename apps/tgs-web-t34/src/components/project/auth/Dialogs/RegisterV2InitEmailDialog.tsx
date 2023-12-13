import React from "react";
import { useAuthContext, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";

const RegisterV2InitEmailDialog = () => {
  const { isRegisterV2InitEmailDialogOpen, handleToggleInitEmailDialog } = useAuthDialog();
  const { handleLogout } = useAuthContext();

  const handleClose = async () => {
    handleToggleInitEmailDialog(false);
    await handleLogout();
  };

  return (
    <AuthDialog open={isRegisterV2InitEmailDialogOpen} onClose={() => handleClose()}>
      <AuthFormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.InitEmail} />
      </AuthFormContainer>
    </AuthDialog>
  );
};

export default RegisterV2InitEmailDialog;
