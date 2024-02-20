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
import AffiliateProgram from "@/pages/home/components/AffiliateProgram";
import DesktopAffiliateProgram from "@/pages/home/components/DesktopAffiliateProgram";
import config from "@tgs-web-nx/config";
import Marquee from "@/pages/home/components/CardPrompt/components/Marquee";
import HomeGameTypeTab from "@/pages/home/components/HomeGameTypeTab";

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
    padding: 20px 0px;
    gap: 20px;
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
    background: #D84736 !important;
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

const GameTypeBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 158px;
  margin: 0 auto;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${media.sm} {
    height: 438px;
  }
`;

const WalletWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.darkGray};
  border-radius: 5px;
  margin: 10px 0;
`;

const WalletBtn = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: #F2F2F2;
  width: 95px;
  padding: 12px 15px;
`;

const Line = styled.div`
  width: 2px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ theme }) => theme.lightGray};
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();

  const { activeGameType, activeGameTypeKey, handleChangeGameType } =
    useHomeGameContext();
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
  }, [urlGameType, gameTypeList]);

  return (
    <MainWrapper>
      {!!general.banner.length && !activeGameType &&
        <SliderWrapper>
          <Slider settings={settings} />
        </SliderWrapper>
      }
      {isDesktopSize && !activeGameType && <Marquee />}
      {isMobileSize && !activeGameType && <CardPrompt />}
      {!!general.banner.length && !activeGameType && <HomeGameTypeTab />}
      {!!activeGameType && (
        <GameTypeBanner
          $imageUrl={
            activeGameTypeKey
              ? `${import.meta.env.BASE_URL
              }assets/images/home/gameType_banner/${activeGameTypeKey}.png`
              : ""
          }
        />
      )}

      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>

      {isMobileSize && !activeGameType && (
        <>
          <WalletWrapper>
            <WalletBtn onClick={() => history.push("/deposit")}>{i18n.t("common.deposit")}</WalletBtn>
            <Line />
            <WalletBtn onClick={() => history.push("/withdrawal")}>{i18n.t("common.withdrawal")}</WalletBtn>
          </WalletWrapper>
          <SocialMedia />
          <VendorLogo />
        </>
      )}
    </MainWrapper>
  );
};

export default React.memo(HomePage);
