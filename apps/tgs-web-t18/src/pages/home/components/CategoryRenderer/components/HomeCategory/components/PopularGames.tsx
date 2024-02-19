import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import GameCard from "@/pages/home/components/GameCard";
import { useCardWidth } from "@/hooks/home/useCardWidth";
import {
  CategoryHeader,
  MoreButton,
} from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory";
import HotIcon from "@/assets/t18/images/home/mobile/hot.svg";

const PopularGamesContainer = styled.div`
  //padding: 14.49px;
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

const HotText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9dacd0;
`;

const PopularGames = () => {
  // const { recommendGames } = useGetHomeCategoryListV2();
  const { hotGameList } = useGetHomeCategoryList();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();
  const cardWidth = useCardWidth("14px");

  const handleClick = () => {
    const gameTypeItem = {
      gameType: GameTypeEnum.SLOT,
      key: "slots",
    };
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <PopularGamesContainer>
      <CategoryHeader>
        <HotText>
          <img src={HotIcon} width={28} alt="hot" />
          {i18n.t("slot.hotGame")}
        </HotText>

        <MoreButton onClick={handleClick}>{i18n.t("web.slotGame.more")}</MoreButton>
      </CategoryHeader>

      <GameCardContainer>
        {hotGameList.map((gameItem) => {
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
