import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import GameCard from "@/pages/home/components/GameCard";
import { useCardWidth } from "@/hooks/home/useCardWidth";

const PopularGamesContainer = styled.div``;

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 10px 0;

  & > div {
    width: calc((100% - 25px * 5) / 6);
  }
`;

const PopularGames = () => {
  const { recommendGames } = useGetHomeCategoryListV2();
  const cardWidth = useCardWidth("14px");

  return (
    <PopularGamesContainer>
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
              style={{
                width: cardWidth,
              }}
            />
          );
        })}
      </GameCardContainer>
    </PopularGamesContainer>
  );
};

export default PopularGames;
