import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useParams } from "react-router-dom";
import config from "@tgs-web-nx/config";
import CategorySection from "./components/CategorySection";
import MobileFooter from "./components/MobileFooter";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import CardPrompt from "@/pages/home/components/CardPrompt";
import ScrollableHomeHot from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeHot";
import ScrollableHomeNew from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeNew";
import ScrollableHomeRecommend from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/ScrollableHomeRecommend";
import HomePromotionCard from "@/pages/home/components/HomePromotion";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.grey04};

  ${media.sm} {
    background: transparent;
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
    padding: 0px 0px 0px 0px;
  }
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
    background: ${({ theme }) => `${theme.primary}  !important`};
  }
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

const Introduction = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 21px;
  background-color: ${({ theme }) => theme.g3};
  margin-bottom: 30px;
`;

const Brand = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  color: ${({ theme }) => theme.grey05};

  ${media.sm} {
    background: ${({ theme }) => theme.primary};
    padding: 10px;
    color: ${({ theme }) => theme.white};
    font-size: 14px;
    font-weight: 600;
    line-height: 16.41px;
  }
`;

const IntroductionText = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  width: 100%;
  color: ${({ theme }) => theme.grey04};
  ${media.sm} {
    color: ${({ theme }) => theme.white};
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
  }
`;

const BannerWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;

  ${media.sm} {
    height: 100%;
    max-height: 800px;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 350px;
  margin: 0 auto;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();

  const { activeGameType, handleChangeGameType, activeGameTypeKey } = useHomeGameContext();

  const gameTypeList = useGameTypeList();

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
  };

  const settings = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [urlGameType, gameTypeList]);

  return (
    <MainWrapper>
      {activeGameType === GameTypeEnum.NONE && (
        <>
          {isDesktopSize && <CardPrompt />}
          {!!general.banner.length && (
            <SliderWrapper>
              <Slider settings={settings} />
            </SliderWrapper>
          )}
          {isMobileSize && <CardPrompt />}
          {!activeGameType && (
            <>
              <CategorySection />
              <HomeCategoryContainer>
                <ScrollableHomeHot />
                <ScrollableHomeNew />
                <ScrollableHomeRecommend />
                {isMobileSize && <HomePromotionCard />}
                <Introduction>
                  <Brand>{config.brand} : A Winning Casino!</Brand>
                  <IntroductionText>
                    {config.brand} is the leading destination for all online casino players who are
                    looking for a touch of class and elegance in their gaming environment. Our
                    casino provides you with over 400 online casino games – some traditional with
                    modern twists, and some completely new, innovative, and exotic.
                  </IntroductionText>
                </Introduction>
              </HomeCategoryContainer>
              {isMobileSize && <MobileFooter />}
            </>
          )}
        </>
      )}
      <BannerWrapper>
        {activeGameType !== GameTypeEnum.NONE && isDesktopSize && (
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

      {/* 首頁並且進入遊戲大廳 */}
      {/* 切換遊戲分頁 */}
      {activeGameType !== GameTypeEnum.NONE && (
        <MainContentWrapper>
          <CategoryRenderer />
        </MainContentWrapper>
      )}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
