import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";

const GameTypeNavPopupContent = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isDesktopSize } = useRwd();

  // useEffect(() => {
  //   handleChangeGameType(isDesktopSize ? GameTypeEnum.NONE : GameTypeEnum.SPORTS);
  // }, [isDesktopSize]);

  switch (activeGameType) {
    case GameTypeEnum.LIVELOBBY:
    case GameTypeEnum.ARCADELOBBY:
    case GameTypeEnum.SPORTS:
    case GameTypeEnum.COCKFIGHT:
    case GameTypeEnum.ESPORTS:
    case GameTypeEnum.QIPAILOBBY:
      return <LobbyCategory />;

    default:
    case GameTypeEnum.NONE:
      return <HomeCategory />;
  }
};

export default GameTypeNavPopupContent;
