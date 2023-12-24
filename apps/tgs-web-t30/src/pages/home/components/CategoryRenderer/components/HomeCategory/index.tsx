import styled from "styled-components";
import React from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import GameTypeCategory from "./GameTypeCategory";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";
import DesktopHomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory/DesktopHomeCategory";

const HomeCategoryContainer = styled.div`
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const HomeCategory = () => {
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();
  const { isMobileSize } = useRwd();

  if (isMobileSize) {
    return (
      <HomeCategoryContainer>
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
  }

  return (
    <HomeCategoryContainer>
      <DesktopHomeCategory />
    </HomeCategoryContainer>
  );
};

export default React.memo(HomeCategory);
