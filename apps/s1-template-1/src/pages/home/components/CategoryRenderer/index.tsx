import HomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory";
import NonLobbyCategory from "@/pages/home/components/CategoryRenderer/components/NonLobbyCategory";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import NonLobbyProvider from "./components/NonLobbyProvider";

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
  switch (activeGameType) {
    case GameTypeEnum.NONE:
      return <HomeCategory />;
    case GameTypeEnum.ALL:
      return <NonLobbyProvider />;
    default:
      return <NonLobbyCategory />;
  }
};

export default CategoryRenderer;
