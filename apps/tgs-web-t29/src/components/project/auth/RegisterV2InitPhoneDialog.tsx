import React from "react";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import InitPhoneStage from "@/pages/register/components/RegisterFormStage/stage/InitPhoneStage";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2InitPhoneDialogOpen, handleToggleInitPhoneDialog } = useAuthDialog();

  return (
    <AuthDialog
      open={isRegisterV2InitPhoneDialogOpen}
      onClose={() => handleToggleInitPhoneDialog(false)}
    >
      <InitPhoneStage />
    </AuthDialog>
  );
};

export default RegisterV2InitPhoneDialog;
