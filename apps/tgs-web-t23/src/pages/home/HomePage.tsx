import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import HomePromotionCard from "./components/HomePromotionCard";
import ImageCard from "./components/ImageCard";
import WinnerCard from "./components/WinnerCard";
import { useBettingHistory } from "@/pages/home/components/WinnerCard/hooks/useBettingHistory";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { footerCategoriesList } from "@/layouts/components/Footer/footerCategoriesList";
import HomeCategoryFolder from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeCategoryFolder";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0px;
    gap: 20px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 160px;

  ${media.sm} {
    height: 375px;
    border-radius: 10px;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;

  ${media.sm} {
    max-width: 1200px;
    height: 375px;
    border-radius: 10px;
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.white};
  gap: 10px;
  flex-shrink: 0;

  ${media.sm} {
    gap: 20px;
    padding: unset;
  }
`;

const HomeAdContainer = styled.div`
  width: 100%;

  ${media.sm} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100%;
    max-height: 395px;
  }
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { leaderboard } = useBettingHistory();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [activeGameType]);

  return (
    <MainWrapper>
      {(isMobileSize || (isDesktopSize && !activeGameType)) && !!general.banner.length && (
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      )}
      {!!activeGameType && (
        <GameTypeBanner
          $imageUrl={
            activeGameTypeKey
              ? `${import.meta.env.BASE_URL}assets/images/home/gp_banner/${activeGameTypeKey}.png`
              : ""
          }
        />
      )}

      <MainContentWrapper>
        {(isMobileSize || (isDesktopSize && !activeGameType)) && <CardPrompt />}
        {isMobileSize && <GameTypeTab />}

        <CategoryRenderer />

        {!activeGameType && (
          <>
            <HomeAdContainer>
              <HomePromotionCard />
              <WinnerCard leaderboard={leaderboard} />
            </HomeAdContainer>

            {isMobileSize &&
              footerCategoriesList.length &&
              footerCategoriesList.map((category, index) => (
                <HomeCategoryFolder key={index} title={category.title} size={category.size!}>
                  {category.content ? (
                    category.content
                  ) : (
                    <ImageCard
                      imageUrl={category.imageUrl}
                      text={category.text}
                      alignment={category.alignment}
                    />
                  )}
                </HomeCategoryFolder>
              ))}
          </>
        )}
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
