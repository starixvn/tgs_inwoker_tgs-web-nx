import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "@tgs-web-nx/core/features";

export function useAuthDialogLayout() {
  const history = useHistory();
  const { isLogin } = useAuth();

  const handleCloseDialog = useCallback(() => {
    if (!isLogin) {
      history.push("/");
      return;
    }

    history.goBack();
  }, [history, isLogin]);

  return {
    handleCloseDialog,
  };
}
