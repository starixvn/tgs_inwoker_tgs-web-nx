import { useCallback } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "./useRwd";

export function useGoToHomePage() {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();

  return useCallback(() => {
    if (isMobileSize) {
      handleChangeGameType(GameTypeEnum.SPORTS);
    } else {
      handleChangeGameType(GameTypeEnum.NONE);
    }
    history.push("/");
  }, [isMobileSize]);
}
