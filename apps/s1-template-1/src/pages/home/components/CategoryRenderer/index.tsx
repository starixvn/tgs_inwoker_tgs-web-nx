import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { getGameTypeName } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import GamesByProvider from "./components/GamesByProvider";
import GamesByTag from "./components/GamesByTag";

const CategoryRenderer = () => {
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isDesktopSize } = useRwd();
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/") {
      handleChangeGameType(GameTypeEnum.HOME);
    } else {
      handleChangeGameType(isDesktopSize ? activeGameType : GameTypeEnum.SPORTS);
    }
  }, [isDesktopSize]);

  switch (activeGameType) {
    case GameTypeEnum.HOME:
      return <HomeCategory />;
    case GameTypeEnum.ALL:
      return <GamesByProvider />;
    case GameTypeEnum.HOT:
    case GameTypeEnum.NEW:
      return <GamesByTag  />;
    case GameTypeEnum.NONE: 
      return <></>
    default:
      return <NonLobbyCategory />;
  }
};

export default CategoryRenderer;
