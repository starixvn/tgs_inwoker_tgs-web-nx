import { useSnackbar } from "notistack";
import { useAuthDialog } from "../../../index";

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
