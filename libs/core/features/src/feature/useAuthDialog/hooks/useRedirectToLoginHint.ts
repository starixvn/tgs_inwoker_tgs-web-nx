import { useCallback } from "react";

import { useAuthDialog } from "./useAuthDialog";

export function useRedirectToLoginHint() {
  const { handleToggleRegisterDialog, handleToggleLoginDialog, handleToggleForgotPasswordDialog } =
    useAuthDialog();

  const handleRedirect = useCallback(() => {
    handleToggleRegisterDialog(false);
    handleToggleForgotPasswordDialog(false);
    handleToggleLoginDialog(true);
  }, []);

  return {
    handleRedirect,
  };
}
