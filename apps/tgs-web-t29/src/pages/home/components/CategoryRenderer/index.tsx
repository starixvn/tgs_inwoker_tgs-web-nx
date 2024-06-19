import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";

const CategoryRenderer = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMobileSize, isDesktopSize } = useRwd();
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/" && isMobileSize) {
      const defaultGametype = brandConfig[mapBrandName(config.brand)].defaultActiveGametype
        ? (brandConfig[mapBrandName(config.brand)].defaultActiveGametype as GameTypeEnum)
        : GameTypeEnum.SPORTS;
      handleChangeGameType(defaultGametype);
    } else {
      handleChangeGameType(activeGameType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileSize]);

  if (isDesktopSize) {
    switch (activeGameType) {
      case GameTypeEnum.NONE:
        return <HomeCategory />;
    }
  }

  switch (activeGameType) {
    case GameTypeEnum.SLOT:
    case GameTypeEnum.FISH:
    case GameTypeEnum.TABLEGAME:
    // 虛擬體育雖是歸類在體育底下,但呈現方式是和NonLobby一樣
    // eslint-disable-next-line no-fallthrough
    case GameTypeEnum.RNGSPORTS:
      return <NonLobbyCategory />;

    default:
    case GameTypeEnum.LIVELOBBY:
    case GameTypeEnum.ARCADELOBBY:
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.COCKFIGHT:
    case GameTypeEnum.ESPORTS:
    case GameTypeEnum.QIPAILOBBY:
      return <LobbyCategory />;
  }
};

export default CategoryRenderer;
