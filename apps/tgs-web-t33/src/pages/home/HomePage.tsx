import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import HomePromotionCard from "./components/HomePromotionCard";
import ImageCard from "./components/ImageCard";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import Slider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { footerCategoriesList } from "@/layouts/components/Footer/footerCategoriesList";
import HomeCategoryFolder from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeCategoryFolder";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  padding-bottom: 42.52%

  ${media.sm} {
    padding-bottom: 41.35%
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
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    padding: 10px 10px 50px 10px;
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
      {!!general.banner.length && (
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      )}

      <MainContentWrapper>
        <CardPrompt />

        {/* {isMobileSize && !activeGameType && <GameTypeTab />} */}

        <CategoryRenderer />

        {!activeGameType && (
          <>
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
          </>
        )}
      </MainContentWrapper>


      {/*       
      {!!activeGameType && (
        <GameTypeBanner
          $imageUrl={
            activeGameTypeKey
              ? `${import.meta.env.BASE_URL}assets/images/home/gp_banner/${activeGameTypeKey}.png`
              : ""
          }
        />
      )} */}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
