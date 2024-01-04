import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import MobileHomeCategory from "@/pages/home/components/CategoryRenderer/components/MobileHomeCategory";
import LobbyCategory from "@/pages/home/components/CategoryRenderer/components/LobbyCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";

const CategoryRenderer = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isDesktopSize } = useRwd();
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/") {
      handleChangeGameType(isDesktopSize ? GameTypeEnum.NONE : GameTypeEnum.NONE);
    } else {
      handleChangeGameType(isDesktopSize ? activeGameType : GameTypeEnum.SPORTS);
    }
  }, [isDesktopSize]);

  // if (isDesktopSize) {
  //   switch (activeGameType) {
  //     case GameTypeEnum.NONE:
  //       return <HomeCategory />;
  //   }
  // }

  switch (activeGameType) {
    case GameTypeEnum.NONE:
      return isDesktopSize ? <HomeCategory /> : <MobileHomeCategory />;
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
