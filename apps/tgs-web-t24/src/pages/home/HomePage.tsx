import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import Slider from "@/pages/home/components/Slider";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { media } from "@/theme/breakpoints";
import React, { useEffect } from "react";
import styled from "styled-components";

import { footerCategoriesList } from "@/components/layouts/Footer/footerCategoriesList";
import HomeCategoryFolder from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeCategoryFolder";
import HomePromotionCard from "./components/HomePromotionCard";
import ImageCard from "./components/ImageCard";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: 1072px;
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
    max-width: 1072px;
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

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();

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
        <HomePromotionCard />

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

        {/* <TabPanel /> */}
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
