import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// if user navigate to prev page while dialog is opened, dialog need to close itself
export function useDetectDialogClose(isOpen: boolean, handleCloseDialog: () => void) {
  const history = useHistory();

  useEffect(() => {
    const unListen = history.listen(() => {
      // router changed
      if (!isOpen) return;

      handleCloseDialog();
    });
    return () => {
      unListen();
    };
  }, [isOpen]);
}
