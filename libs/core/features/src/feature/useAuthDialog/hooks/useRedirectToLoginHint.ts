import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useAuthDialog } from "./useAuthDialog";

export function useRedirectToLoginHint() {
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog, handleToggleLoginDialog, handleToggleForgotPasswordDialog } =
    useAuthDialog();
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!isDesktopSize) {
      return history.push("/login");
    }

    handleToggleRegisterDialog(false);
    handleToggleForgotPasswordDialog(false);
    handleToggleLoginDialog(true);
  }, []);

  return {
    handleRedirect,
  };
}
