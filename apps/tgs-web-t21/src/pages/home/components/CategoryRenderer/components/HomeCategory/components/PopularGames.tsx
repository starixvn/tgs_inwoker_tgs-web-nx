import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import GameCard from "@/pages/home/components/GameCard";
import { useCardWidth } from "@/hooks/home/useCardWidth";
import {
  CategoryHeader,
  MoreButton,
} from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory";

const PopularGamesContainer = styled.div`
  padding: 14.49px;
`;

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
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();
  const cardWidth = useCardWidth("14px");

  const handleClick = () => {
    const gameTypeItem = {
      gameType: GameTypeEnum.LIVE,
      key: "liveCasino",
    };
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <PopularGamesContainer>
      <CategoryHeader>
        {i18n.t("slot.recommendGame")}

        <MoreButton onClick={handleClick}>{i18n.t("web.slotGame.more")}</MoreButton>
      </CategoryHeader>

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
