import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthDialog } from "./useAuthDialog";

export function useRedirectToRegisterHint() {
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog, handleToggleLoginDialog } = useAuthDialog();
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!isDesktopSize) {
      return history.push("/register");
    }

    handleToggleLoginDialog(false);
    handleToggleRegisterDialog(true);
  }, []);

  return {
    handleRedirect,
  };
}
