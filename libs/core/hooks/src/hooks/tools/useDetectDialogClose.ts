import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
