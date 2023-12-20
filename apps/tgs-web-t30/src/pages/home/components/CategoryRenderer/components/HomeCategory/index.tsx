import styled from "styled-components";
import React from "react";
import GameTypeCategory from "./GameTypeCategory";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";

const DesktopContainer = styled.div`
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
  }
`;

const HomeCategory = () => {
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();

  return (
    <DesktopContainer>
      {gameTypeItemList.map((gameTypeItem) => {
        return (
          <GameTypeCategory
            key={gameTypeItem.key}
            gameTypeItem={gameTypeItem}
            gameList={gameTypeDictionary[gameTypeItem.gameType] || []}
          />
        );
      })}
    </DesktopContainer>
  );
};

export default React.memo(HomeCategory);
