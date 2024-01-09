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
import { i18n } from "@tgs-web-nx/utils";
import CategorySection from "./components/CategorySection";
import SocialMedia from "@/components/project/SocialMedia";
import VendorLogo from "@/pages/home/components/VendorLogo";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
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

  ${media.sm} {
    height: 100%;
  }
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

  border: 1px solid red;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    background-color: transparent;
  }
`;

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 520px;
  margin: 0 auto;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();

  const { activeGameType, activeGameTypeKey, handleChangeGameType, activeNavPopupGameType, isEnterGamePortal } =
    useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const history = useHistory();
  const gameTypeList = useGameTypeList();

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

  console.log("activeGameType", activeGameType)

  return (
    <MainWrapper>
      {/* 首頁但未進入遊戲大廳 */}
      {!!general.banner.length && isMobileSize && !isEnterGamePortal && (
        <>
          <CardPrompt />
          <RegisterSection />
          <SliderWrapper>
            <Slider settings={settings} />
          </SliderWrapper>
          <CategorySection />
          <SocialMedia />
          <VendorLogo />
        </>
      )}

      {/* {!!general.banner.length && isDesktopSize && !activeGameType && (
        <SliderWrapper>
          <Slider maxHeight={"600px"} settings={settings} />
        </SliderWrapper>
      )}
      {!!general.banner.length && isDesktopSize && !!activeGameType && (
        <SliderWrapper>
          <GameTypeBanner
            $imageUrl={
              activeGameTypeKey
                ? `${import.meta.env.BASE_URL
                }assets/images/home/gameType_banner/${activeGameTypeKey}.png`
                : ""
            }
          />
        </SliderWrapper>
      )}

      {isDesktopSize && !activeGameType &&
        <DesktopBg>
          <NotificationWrapper><CardPromptDesktop /></NotificationWrapper>
          <MainContentWrapper>
            <CategoryRenderer />
          </MainContentWrapper>
        </DesktopBg>}
      {(isDesktopSize && !!activeGameType) && (
        <MainContentWrapper>
          <CategoryRenderer />
        </MainContentWrapper>
      )} */}

      {isMobileSize && !!activeGameType && isEnterGamePortal && (
        <>
          <SliderWrapper>
            <Slider settings={settings} />
          </SliderWrapper>
          <MainContentWrapper>
            <CategoryRenderer />
          </MainContentWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
