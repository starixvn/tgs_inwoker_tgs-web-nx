import { useGetGamesByProvider, useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import GamesWrapper from "../NonLobbyCategory/GamesWrapper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProviderContainer = styled.div`
  width: 100%;
  position: relative;

  ${GameTypeTitle} {
    margin-bottom: 0;
  }

  ${FilterTagWrapper} {
    position: absolute;
    top: -4.8rem;
    right: 0;
  }
`;

const GamesByProvider = () => {
  const { gameList, isLoading, total } = useGetGamesByProvider();
  const { searchedGameProviderName, providerList, handleGamesByProvider } = useHomeGameContext();
  const { providerRoute } = useParams<{ providerRoute: string }>();

  useEffect(() => {
    if (!providerRoute) return;  
    const provider = providerList.find((provider) => provider.route === providerRoute);
    if(provider) {
      handleGamesByProvider(provider);
    }
  }, [providerRoute, providerList]);

  return (
    <ProviderContainer>
      <GameTypeTitle>{searchedGameProviderName}</GameTypeTitle>
      <GamesWrapper
        isHideProviderDropdown={true}
        gameList={gameList}
        isLoading={isLoading}
        totalGames={total}
      />
    </ProviderContainer>
  );
};

export default GamesByProvider;
