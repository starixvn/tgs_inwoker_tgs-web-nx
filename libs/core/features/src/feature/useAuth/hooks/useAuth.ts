import { useAccountStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useAuthDialog } from "../../useAuthDialog";
import { useHeader } from "../../useHeader";

export function useAuth() {
  const { account } = useAccountStore();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();
  const { handleToggleMenu } = useHeader();
  const history = useHistory();

  const { isDesktopSize } = useRwd();

  const isLogin = !!account.token;

  const goToLogin = useCallback(() => {
    // if (!isDesktopSize) {
    //   handleToggleMenu(false);
    // }

    // if (isDesktopSize) {
    //   handleToggleLoginDialog(true);
    //   return;
    // }

    // history.push("/login");
    handleToggleLoginDialog(true);
  }, [handleToggleLoginDialog, handleToggleMenu, history]);

  const goToRegister = useCallback(() => {
    handleToggleRegisterDialog(true);

    // if (!isDesktopSize) {
    //   handleToggleMenu(false);
    // }

    // if (isDesktopSize) {
    //   handleToggleRegisterDialog(true);
    //   return;
    // }
    // history.push("/register");
  }, [handleToggleMenu, handleToggleRegisterDialog, history]);

  return {
    isLogin,
    goToLogin,
    goToRegister,
  };
}
