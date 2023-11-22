import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";

const CategoryRenderer = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (!isDesktopSize) {
      handleChangeGameType(GameTypeEnum.SPORTS);
    }
  }, [isDesktopSize]);

  if (isDesktopSize) {
    switch (activeGameType) {
      case GameTypeEnum.NONE:
        return <HomeCategory />;
      default:
        return null;
    }
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
