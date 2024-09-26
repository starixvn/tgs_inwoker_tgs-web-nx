import { useGetGamesByTag, useHomeGameContext } from "@tgs-web-nx/core/features";
import { getGameTypeName } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

import { GameTypeTitle } from "../HomeCategory/style";
import GamesWrapper from "../NonLobbyCategory/GamesWrapper";
import { ContainerWithTitle } from "./style";

const GamesByTag = () => {
  const { gameList, isLoading, total } = useGetGamesByTag();
  const { activeGameType } = useHomeGameContext();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(getGameTypeName(activeGameType));
  }, []);

  return (
    <ContainerWithTitle>
      <GameTypeTitle>{title}</GameTypeTitle>
      <GamesWrapper
        isHideOrderDropdown={true}
        gameList={gameList}
        isLoading={isLoading}
        totalGames={total}
      />
    </ContainerWithTitle>
  );
};

export default GamesByTag;
