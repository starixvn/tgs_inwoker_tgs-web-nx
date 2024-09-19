import { TagTypeEnum, useGetGamesByTag, useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

import { FilterTagWrapper } from "../../../HomeGameFilterTag/style";
import { GameTypeTitle } from "../HomeCategory/style";
import GamesWrapper from "../NonLobbyCategory/GamesWrapper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameTypeName } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";

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

const GamesByTag = () => {
  const { gameList, isLoading, total } = useGetGamesByTag();
  const { activeGameType } = useHomeGameContext();
  const  [ title, setTitle ] = useState<string>('');

  useEffect(() => {
    setTitle(getGameTypeName(activeGameType));
  }, []);

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
