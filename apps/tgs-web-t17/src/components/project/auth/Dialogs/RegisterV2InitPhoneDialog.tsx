import { useEffect } from "react";
import { useAuthContext, useAuthDialog, usePageName } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";
import { i18n } from "@tgs-web-nx/utils";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2InitPhoneDialogOpen, handleToggleInitPhoneDialog } = useAuthDialog();
  const { handleLogout } = useAuthContext();
  const { updatePageName } = usePageName();

 
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
