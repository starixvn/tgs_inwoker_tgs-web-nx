import { useGetAllGameListOfProvider, useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import NonLobbyWrapper from "../NonLobbyCategory/NonLobbyWrapper";

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

const NonLobbyProvider = () => {
  const { gameList, isLoading, total } = useGetAllGameListOfProvider();
  const { searchedGameProviderName } = useHomeGameContext();

  return (
    <ProviderContainer>
      <GameTypeTitle>{searchedGameProviderName}</GameTypeTitle>
      <NonLobbyWrapper
        isHideProviderDropdown={true}
        gameList={gameList}
        isLoading={isLoading}
        totalGames={total}
      />
    </ProviderContainer>
  );
};

export default NonLobbyProvider;
