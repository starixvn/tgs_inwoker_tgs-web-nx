import { useGetGamesByProvider, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ContainerWithTitle } from "../GamesByTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import GamesWrapper from "../NonLobbyCategory/GamesWrapper";

const GamesByProvider = () => {
  const { gameList, isLoading, total } = useGetGamesByProvider();
  const { searchedGameProviderName, providerList, handleGamesByProvider } = useHomeGameContext();
  const { providerRoute } = useParams<{ providerRoute: string }>();

  useEffect(() => {
    if (!providerRoute) return;
    const provider = providerList.find((provider) => provider.route === providerRoute);
    if (provider) {
      handleGamesByProvider(provider);
    }
  }, [providerRoute, providerList]);

  return (
    <ContainerWithTitle>
      <GameTypeTitle>{searchedGameProviderName}</GameTypeTitle>
      <GamesWrapper
        isHideProviderDropdown={true}
        gameList={gameList}
        isLoading={isLoading}
        totalGames={total}
      />
    </ContainerWithTitle>
  );
};

export default GamesByProvider;
