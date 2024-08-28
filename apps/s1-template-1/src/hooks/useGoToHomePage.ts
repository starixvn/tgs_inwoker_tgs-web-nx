import { useCallback } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

export function useGoToHomePage() {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  return useCallback(() => {
    if (isDesktopSize) {
      handleChangeGameType(GameTypeEnum.NONE);
    } else {
      handleChangeGameType(GameTypeEnum.SPORTS);
    }
    history.push("/");
  }, []);
}
