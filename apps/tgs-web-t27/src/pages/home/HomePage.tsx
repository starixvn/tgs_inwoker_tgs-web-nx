import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { GameTypeItem, useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import CardPromptDesktop from "@/pages/home/components/CardPromptDesktop";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import bg from "@/assets/t19/images/home/home_bg.png";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import CardPrompt from "@/pages/home/components/CardPrompt";
import RegisterSection from "@/pages/home/components/RegisterSection";
import DesktopRegisterSection from "@/pages/home/components/DesktopRegisterSection";
import { Common, i18n } from "@tgs-web-nx/utils";
import CategorySection from "./components/CategorySection";
import SocialMedia from "@/components/project/SocialMedia";
import VendorLogo from "@/pages/home/components/VendorLogo";
import { useGetHomeCategoryList } from "@tgs-web-nx/core/features";
import ScrollableHomeCategory from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeHot";
import ScrollableHomeHot from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeHot";
import ScrollableHomeNew from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeNew";
import ScrollableHomeRecommend from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeRecommend";
import { useBettingHistory } from "@/pages/home/components/Ranking/hooks/useBettingHistory";
import LatestRecordTable from "@/pages/home/components/Ranking/LatestRecordTable";
import AffiliateProgram from "@/pages/home/components//AffiliateProgram";
import DesktopAffiliateProgram from "@/pages/home/components/DesktopAffiliateProgram";
import config from "@tgs-web-nx/config";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
    padding: 0px 0px 0px 0px;
  }
`;

const DesktopBg = styled.div`
  width: 100%;
  min-height: 100%;
  max-width: ${MAIN_CONTENT_MAX_WIDTH};
  margin: 0 auto;
  padding: 0px 0px 0px 0px;
  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const SliderWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const SlickDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.white};
`;

const SlickDotWrapper = styled.div`
  margin-bottom: 30px;

  & ul li.slick-active ${SlickDot} {
    background: #45D91E !important;
  }
`;

const NotificationWrapper = styled.div`
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  margin: 30px auto 14px;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    background-color: transparent;
  }
`;

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const HomeLobbyCategory = styled.div`
  width: 100%;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0px;
`;

const SlotCategoryContent = styled.div`
  width: 100%;
  row-gap: 15px;
  column-gap: 31px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const HomeRanking = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 12px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 17.5px;
  font-weight: 400;
  line-height: 22px;
  color: ${({ theme }) => theme.white};
`;

const Introduction = styled.div`
 display: flex;
  padding: 60px 42px;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;
  background-color: ${({ theme }) => theme.g3};
  margin-bottom: 30px;
`;

const Brand = styled.div`
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  line-height: 58.36px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.white};
`;

const IntroductionText = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: ${({ theme }) => theme.g2};
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();

  const { activeGameType, handleChangeGameType, isEnterGamePortal } =
    useHomeGameContext();
  const history = useHistory();
  const gameTypeList = useGameTypeList();
  const { betRecordList } = useBettingHistory();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };

  const settings = {
    appendDots: (dots: any) => (
      <SlickDotWrapper>
        <ul>{dots}</ul>
      </SlickDotWrapper>
    ),
    customPaging: (i: number) => {
      return <SlickDot key={i} />;
    },
  };


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  useEffect(() => {
    const gameType = getGameTypeFromKey(urlGameType);
    if (gameType) {
      handleChangeGameType(gameType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlGameType]);

  return (
    <MainWrapper>
      <CardPrompt />
      {/* 首頁但未進入遊戲大廳 */}
      {!isEnterGamePortal && !activeGameType &&
        <>
          {isDesktopSize ? <DesktopRegisterSection /> : <RegisterSection />}
        </>
      }
      {!!general.banner.length &&
        <SliderWrapper>
          <Slider settings={settings} />
        </SliderWrapper>
      }

      {!isEnterGamePortal && !activeGameType &&
        <>
          <CategorySection />
          <HomeCategoryContainer>
            <ScrollableHomeRecommend />
            <ScrollableHomeHot />
            <HomeRanking>
              <Title>Latest Bets & Wins</Title>
              <LatestRecordTable betRecordList={betRecordList} />
            </HomeRanking>
            {isDesktopSize ? <DesktopAffiliateProgram /> : <AffiliateProgram />}
            <ScrollableHomeNew />
            <Introduction>
              <Brand>{config.brand} : A Winning Casino!</Brand>
              <IntroductionText>
                {config.brand} is the leading destination for all online casino players who are looking for a touch of class and elegance in their gaming environment. Our casino provides you with over 400 online casino games – some traditional with modern twists, and some completely new, innovative, and exotic.
              </IntroductionText>
            </Introduction>
          </HomeCategoryContainer>
        </>
      }

      {isMobileSize && !isEnterGamePortal && !activeGameType && (
        <>
          <SocialMedia />
          <VendorLogo />
        </>
      )}

      {/* 首頁並且進入遊戲大廳 */}{/* 切換遊戲分頁 */}
      {isEnterGamePortal && (
        <MainContentWrapper>
          <CategoryRenderer />
        </MainContentWrapper>
      )}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
