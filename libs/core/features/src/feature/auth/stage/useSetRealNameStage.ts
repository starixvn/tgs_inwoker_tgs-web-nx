import { useSnackbar } from "notistack";
import { useAuthDialog } from "../../../index";

export function useSetRealNameStage() {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleSetRealNameDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleSetRealNameDialog(false);
  };

  return {
    handleCloseDialog,
    enqueueSnackbar,
  };
}
