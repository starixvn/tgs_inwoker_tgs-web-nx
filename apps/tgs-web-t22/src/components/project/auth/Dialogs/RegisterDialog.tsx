import { useAuthDialog } from "@tgs-web-nx/core/features";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import { DialogContentWithBG } from "@/components/styled-component/DialogContentWithBG";
import LoginToggleForm from "@/components/project/auth/LoginToggleForm";

const RegisterDialog = () => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <DialogContentWithBG >
        <LoginToggleForm mode="register" />
      </DialogContentWithBG>
    </AuthDialog>
  );
};

export default RegisterDialog;
