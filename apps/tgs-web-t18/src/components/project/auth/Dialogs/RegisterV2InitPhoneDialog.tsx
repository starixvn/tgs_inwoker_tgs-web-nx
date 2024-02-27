import { useEffect } from "react";
import { useAuthContext, useAuthDialog, usePageName } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2InitPhoneDialogOpen, handleToggleInitPhoneDialog } = useAuthDialog();
  const { handleLogout } = useAuthContext();
  const { updatePageName } = usePageName();

 
  const handleClose = async () => {
    handleToggleInitPhoneDialog(false);
    await handleLogout();
  };

  return (
    <ProfileDialog open={isRegisterV2InitPhoneDialogOpen} onClose={handleClose}>
      <RegisterFormStage currentStage={RegisterStageEnum.InitPhone} />
    </ProfileDialog>
  );
};

export default RegisterV2InitPhoneDialog;
