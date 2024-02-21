import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";

const CategoryRenderer = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isDesktopSize, isMobileSize } = useRwd();
  const history = useHistory();
  const isShowHome = isDesktopSize && activeGameType === GameTypeEnum.NONE;

  useEffect(() => {
    if (history.location.pathname === "/" && isMobileSize) {
      handleChangeGameType(GameTypeEnum.SPORTS);
    } else {
      handleChangeGameType(activeGameType);
    }
  }, [isMobileSize]);

  // 電腦版首頁
  if (isShowHome) {
    return <HomeCategory />;
  }

  switch (activeGameType) {
    case GameTypeEnum.SLOT:
    case GameTypeEnum.FISH:
    case GameTypeEnum.TABLEGAME:
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
