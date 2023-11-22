import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useAuthDialog, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "../../tools";

export function useAnonymousHeaderContent() {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();
  const { handleToggleMenu } = useHeader();

  const toggleLoginDialog = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleLoginDialog(true);
      return;
    }

    history.push("/login");
  }, [handleToggleLoginDialog, handleToggleMenu, history, isDesktopSize]);

  const toggleRegisterDialog = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleRegisterDialog(true);
      return;
    }
    history.push("/register");
  }, [handleToggleMenu, handleToggleRegisterDialog, history, isDesktopSize]);

  return {
    toggleLoginDialog,
    toggleRegisterDialog,
  };
}
