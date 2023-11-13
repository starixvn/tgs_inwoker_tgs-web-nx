import React, { useMemo } from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  //gap: 10px;
  height: 40px;
`;

const GameTypeNav = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  //height: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.gray10};
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

type Props = {};
const HeaderGameTypes = (props: Props) => {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();

  const displayedGameTypeList = useMemo(() => {
    const gameTypes: GameTypeItem[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.gameType === GameTypeEnum.NONE) continue;

      gameTypes.push(gameTypeItem);
    }

    return gameTypes;
  }, [gameTypeList]);

  const handleClickNav = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
  };

  return (
    <HeaderGameTypesContainer>
      {displayedGameTypeList.map((gameTypeItem) => {
        return (
          <GameTypeNav onClick={() => handleClickNav(gameTypeItem)}>
            {gameTypeItem.text}
          </GameTypeNav>
        );
      })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypes);
