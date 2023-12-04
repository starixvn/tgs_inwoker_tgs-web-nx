import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import InitEmailStage from "@/pages/register/components/RegisterFormStage/stage/InitEmailStage";

const RegisterV2InitEmailDialog = () => {
  const { isRegisterV2InitEmailDialogOpen, handleToggleInitEmailDialog } = useAuthDialog();

  return (
    <AuthDialog
      open={isRegisterV2InitEmailDialogOpen}
      onClose={() => handleToggleInitEmailDialog(false)}
    >
      <InitEmailStage />
    </AuthDialog>
  );
};

export default RegisterV2InitEmailDialog;
