import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import GameCard from "@/pages/home/components/GameCard";
import { theme } from "@/theme";

const PopularGamesContainer = styled.div``;

const Header = styled.div`
  background: ${({ theme }) => theme.main};
  padding: 4px 10px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 10px 0;

  & > div {
    width: calc((100% - 25px * 5) / 6);
  }
`;

type Props = {};

const PopularGames = (props: Props) => {
  const { recommendGames } = useGetHomeCategoryListV2();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const goToGamePage = () => {
    handleChangeGameType(GameTypeEnum.SLOT);
    history.push(`/main/slots`);
  };

  return (
    <PopularGamesContainer>
      <Header>
        MOST POPULAR GAMES
        <Button
          onClick={goToGamePage}
          sx={{
            background: "linear-gradient(180deg, #216CA6 0%, #024477 100%)",
            color: theme.white,
          }}
        >
          More
        </Button>
      </Header>
      <GameCardContainer>
        {recommendGames.map((gameItem) => {
          return (
            <GameCard
              key={gameItem.id}
              gameItem={gameItem}
              isActive={gameItem.isactive}
              imageUrl={`${
                config.sourceUrl
              }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                gameItem.code
              }.jpg`}
            />
          );
        })}
      </GameCardContainer>
    </PopularGamesContainer>
  );
};

export default PopularGames;
