import { useAuthDialog, useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";

export function useVerifyPhone() {
  const { handleUpdateStage } = useForgotPasswordFormStage();
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitPhoneDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitPhoneDialog(false);
  };

  return {
    handleCloseDialog,
    enqueueSnackbar,
    handleUpdateStage,
  };
}
