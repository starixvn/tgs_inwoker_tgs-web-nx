import { useAuthDialog, useForgotPasswordFormStage } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";


export function useVerifyEmail() {
  const { handleUpdateStage } = useForgotPasswordFormStage();

  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitEmailDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitEmailDialog(false);
  };

  return {
    handleCloseDialog,
    enqueueSnackbar,
    handleUpdateStage,
  };
}
