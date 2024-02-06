import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory, useParams } from "react-router-dom";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { Promotion, ProviderDto } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import Banner from "./components/Banner";
import CardPrompt from "./components/CardPrompt";
import PopularGames from "./components/CategoryRenderer/components/HomeCategory/components/PopularGames";
import MobileVendorCard from "./components/VendorCard/mobile";
import BannerImage from "./components/HomePromotion/BannerImage";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { theme } from "@/theme";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import AuthButtonGroup from "@/pages/home/components/AuthButtonGroup";
import GameTypeCategory, {
  CategoryHeader,
} from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory";
import HomePromotionCard from "@/pages/home/components/HomePromotion";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";

type MainWrapperProps = {
  $isDark: boolean;
  theme: typeof theme;
};

const MainWrapper = styled.div<MainWrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  flex: 1;
  position: relative;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
  }
`;

const CategoryContentWrapper = styled.div`
  width: 100%;
  padding: 14px;
  ${media.sm} {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const BannerWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;

  ${media.sm} {
    height: 100%;
    max-height: 450px;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 450px;
  margin: 0 auto;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const HomePage = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { activeGameType, handleChangeGameType, providerList, activeGameTypeKey } =
    useHomeGameContext();
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();
  const gameTypeList = useGameTypeList();
  const history = useHistory();
  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "instant",
  //   });
  // }, [activeGameType]);

  useEffect(() => {
    const gameType = getGameTypeFromKey(urlGameType);
    if (gameType) {
      handleChangeGameType(gameType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlGameType]);

  return (
    <MainWrapper $isDark={false}>
      {isMobileSize && (
        <>
          <CardPrompt />
          <Banner />
          <AuthButtonGroup />
          <GameTypeTab />
          <MainContentWrapper>
            <CategoryRenderer />
            <HomePromotionCard />
            <CategoryContentWrapper>
              {gameTypeItemList
                .filter(
                  (gameTypeItem) =>
                    gameTypeItem.gameType === GameTypeEnum.LIVELOBBY ||
                    gameTypeItem.gameType === GameTypeEnum.SLOT,
                )
                .reverse()
                .map((gameTypeItem) => {
                  return (
                    <GameTypeCategory
                      key={gameTypeItem.key}
                      gameTypeItem={gameTypeItem}
                      gameList={gameTypeDictionary[gameTypeItem.gameType] || []}
                    />
                  );
                })}
            </CategoryContentWrapper>
          </MainContentWrapper>
          {/* todo: mobile footer */}
        </>
      )}
      {isDesktopSize && (
        <>
          <BannerWrapper>
            {!!activeGameType && (
              <GameTypeBanner
                $imageUrl={
                  activeGameTypeKey
                    ? `${
                        import.meta.env.BASE_URL
                      }assets/images/home/gameType_banner/${activeGameTypeKey}.png`
                    : ""
                }
              />
            )}
          </BannerWrapper>
          <CategoryRenderer />
        </>
      )}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
