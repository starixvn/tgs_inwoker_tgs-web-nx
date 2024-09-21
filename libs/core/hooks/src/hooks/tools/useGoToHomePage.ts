import { useCallback } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import { useRwd } from "./useRwd";

export function useGoToHomePage(withoutHomeIcon = true) {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();

  return useCallback(() => {
    if (isMobileSize && withoutHomeIcon) {
      const defaultGametype = brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].defaultActiveGametype
        ? (brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].defaultActiveGametype as GameTypeEnum)
        : GameTypeEnum.SPORTS;
      handleChangeGameType(defaultGametype);
    } else {
      handleChangeGameType(GameTypeEnum.NONE);
    }
    history.push("/");
  }, [isMobileSize, withoutHomeIcon]);
}
