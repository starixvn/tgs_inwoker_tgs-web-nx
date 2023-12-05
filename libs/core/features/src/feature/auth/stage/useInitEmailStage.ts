import { useSnackbar } from "notistack";
import { useAuthDialog } from "../../../index";

export function useInitEmailStage() {
  const { enqueueSnackbar } = useSnackbar();
  const { handleToggleInitEmailDialog } = useAuthDialog();

  const handleCloseDialog = () => {
    handleToggleInitEmailDialog(false);
  };

  return {
    handleCloseDialog,
    enqueueSnackbar,
  };
}
