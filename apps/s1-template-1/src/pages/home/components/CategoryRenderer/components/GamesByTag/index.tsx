import { useGetGamesByTag } from "@tgs-web-nx/core/features";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import GamesWrapper from "../NonLobbyCategory/GamesWrapper";

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

const GamesByTag: React.FC<{ title: string }> = ({ title }) => {
  const { gameList, isLoading, total } = useGetGamesByTag();

  return (
    <ProviderContainer>
      <GameTypeTitle>{title}</GameTypeTitle>
      <GamesWrapper
        isHideOrderDropdown={true}
        gameList={gameList}
        isLoading={isLoading}
        totalGames={total}
      />
    </ProviderContainer>
  );
};

export default GamesByTag;
