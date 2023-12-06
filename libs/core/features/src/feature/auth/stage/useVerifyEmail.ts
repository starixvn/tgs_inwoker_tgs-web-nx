import { useSnackbar } from "notistack";
import { useForgotPasswordFormStage } from "../../useForgotPasswordFormStage";
import { useAuthDialog } from "../../useAuthDialog";

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
