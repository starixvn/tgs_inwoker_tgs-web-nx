import { useAuthContext, useAuthDialog } from "@tgs-web-nx/core/features";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import RegisterFormStage from "@/components/project/auth/RegisterForm/RegisterFormStage";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";

const RegisterV2InitPhoneDialog = () => {
  const { isRegisterV2InitPhoneDialogOpen, handleToggleInitPhoneDialog } = useAuthDialog();
  const { handleLogout } = useAuthContext();

  const handleClose = async () => {
    handleToggleInitPhoneDialog(false);
    await handleLogout();
  };

  return (
    <AuthDialog open={isRegisterV2InitPhoneDialogOpen} onClose={handleClose}>
      <AuthFormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.InitPhone} />
      </AuthFormContainer>
    </AuthDialog>
  );
};

export default RegisterV2InitPhoneDialog;
