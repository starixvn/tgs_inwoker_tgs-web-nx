import { useAccountStore } from "@tgs-web-nx/core";
import { useCallback } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router-dom";
import { useHeader } from "../../useHeader/index";
import { useAuthDialog } from "../../useAuthDialog";

export function useAuth() {
  const { account } = useAccountStore();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();
  const { handleToggleMenu } = useHeader();
  const history = useHistory();

  const { isDesktopSize } = useRwd();

  const isLogin = !!account.token;

  const gotoLogin = useCallback(() => {
    if (!isDesktopSize) {
      handleToggleMenu(false);
    }

    if (isDesktopSize) {
      handleToggleLoginDialog(true);
      return;
    }

    history.push("/login");
  }, [handleToggleLoginDialog, handleToggleMenu, history, isDesktopSize]);

  const gotoRegister = useCallback(() => {
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
    isLogin,
    gotoLogin,
    gotoRegister,
  };
}
