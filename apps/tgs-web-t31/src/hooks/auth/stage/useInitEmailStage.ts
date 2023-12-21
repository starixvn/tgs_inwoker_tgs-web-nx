import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";

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
