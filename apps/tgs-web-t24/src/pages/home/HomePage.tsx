import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import HomePromotionCard from "./components/HomePromotionCard";
import { media } from "@/theme/breakpoints";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import Slider from "@/pages/home/components/Slider";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import promotionBanner from "@/assets/t24/images/home/promo-banner.png";

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  padding: 16px;
  gap: 16px;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 16px 0;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    height: 273px;
    border-radius: 10px;
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 16px;
`;

const HomePromotionBanner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 360px;
  background-image: url(${promotionBanner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 32px 24px 14px 100px;
`;

const HomePromotionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
      {/* Slider - for desktop */}
      {isDesktopSize && !activeGameType && !!general.banner.length && (
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      )}

      {/* GameTypeBanner - for desktop */}
      {!!activeGameType && isDesktopSize && (
        <GameTypeBanner
          $imageUrl={
            activeGameTypeKey
              ? `${import.meta.env.BASE_URL}assets/images/home/gp_banner/${activeGameTypeKey}.png`
              : ""
          }
        />
      )}

      <MainContentWrapper>
        {((isMobileSize && !activeGameType) || (isDesktopSize && !activeGameType)) && (
          <CardPrompt />
        )}

        {/* GameTypeTab - left side menu */}
        {/* {isMobileSize && !activeGameType && <GameTypeTab />} */}

        {isDesktopSize && !activeGameType && (
          <HomePromotionBanner>
            <HomePromotionCard />
          </HomePromotionBanner>
        )}

        {/* Ad - Welcome to PG */}
        {isMobileSize && !activeGameType && (
          <HomePromotionWrapper>
            <HomePromotionCard />
            <SliderWrapper>
              <Slider />
            </SliderWrapper>
          </HomePromotionWrapper>
        )}

        {/* Promotion card - Casino & Sports */}

        {/* {activeGameType > 0 &&
          <CategoryLabel
            imageUrl={back}
            text={"sports"}
          />
        } */}

        <CategoryRenderer />

        {/* {!activeGameType && (
          <>
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
        )} */}
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
