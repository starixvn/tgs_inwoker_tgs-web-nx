import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
import LoginToggleForm from "@/components/project/auth/LoginToggleForm";

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterDialogOpen, () => handleToggleRegisterDialog(false));

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <DialogContentWithBG>
        <LoginToggleForm mode="register" />
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default RegisterDialog;
