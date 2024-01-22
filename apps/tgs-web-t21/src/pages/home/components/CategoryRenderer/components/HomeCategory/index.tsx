import styled from "styled-components";
import React from "react";
import GameTypeCategory from "./GameTypeCategory";
import PopularGames from "./components/PopularGames";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";

const HomeCategoryContainer = styled.div`
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 0 14px;
  }
`;

const HomeCategory = () => {
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();

  return (
    <HomeCategoryContainer>
      <PopularGames />
      {gameTypeItemList.map((gameTypeItem) => {
        return (
          <GameTypeCategory
            key={gameTypeItem.key}
            gameTypeItem={gameTypeItem}
            gameList={gameTypeDictionary[gameTypeItem.gameType] || []}
          />
        );
      })}
    </HomeCategoryContainer>
  );
};

export default React.memo(HomeCategory);
