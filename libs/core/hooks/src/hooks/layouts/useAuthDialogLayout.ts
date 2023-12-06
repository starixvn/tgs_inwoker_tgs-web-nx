import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useAuthDialogLayout() {
  const history = useHistory();
  const { isLogin } = useAuth();
  const { handleChangeGameType } = useHomeGameContext();

  const handleCloseDialog = useCallback(() => {
    if (!isLogin) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
      return;
    }

    history.goBack();
  }, [history, isLogin]);

  return {
    handleCloseDialog,
  };
}
