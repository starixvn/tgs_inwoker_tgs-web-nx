import { useSnackbar } from "notistack";
import { useAuthDialog, useForgotPasswordFormStage } from "../../../index";

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
