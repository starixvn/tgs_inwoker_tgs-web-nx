import React from "react";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import NonLobbyCategory from "@/components/pages/home/components/CategoryRenderer/components/NonLobbyCategory";
import HomeCategory from "@/components/pages/home/components/CategoryRenderer/components/HomeCategory";
import LobbyCategory from "@/components/pages/home/components/CategoryRenderer/components/LobbyCategory";
import useGameTypeList from "@/hooks/home/useGameTypeList";

type Props = {};
const CategoryRenderer = (props: Props) => {
  const { activeGameType } = useHomeGameContext();
  const gameTypeList = useGameTypeList();

  switch (activeGameType) {
    case GameTypeEnum.NONE:
      return <HomeCategory />;

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
      const gameTypeName =
        gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === activeGameType)?.key || "";

      return <LobbyCategory showDataLength={9} gameTypeName={gameTypeName} />;
  }
};

export default CategoryRenderer;
