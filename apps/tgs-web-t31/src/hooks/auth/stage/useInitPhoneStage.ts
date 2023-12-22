import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";

export function useInitPhoneStage() {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitPhoneDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitPhoneDialog(false);
  };

  return {
    handleCloseDialog,
    enqueueSnackbar,
  };
}
