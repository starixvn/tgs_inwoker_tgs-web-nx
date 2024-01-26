import { useCallback } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

export function useGoToHomePage() {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  return useCallback(() => {
    handleChangeGameType(GameTypeEnum.NONE);
    history.push("/");
  }, []);
}
