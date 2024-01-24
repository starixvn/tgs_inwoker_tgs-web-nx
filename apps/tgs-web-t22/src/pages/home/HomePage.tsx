import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useParams } from "react-router-dom";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import HeaderCard from "@/pages/home/components/HeaderCard";
import MobileSlider from "@/pages/home/components/Slider";
import Marquee from "@/pages/home/components/Marquee";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import bg from "@/assets/t22/images/home/homeBackground.png";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import Jackpot from "@/components/project/Jackpot";
import useBanner from "@/hooks/home/useBanner";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    height: unset;
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

const MainContentWrapper = styled.div`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.white};
  gap: 6px;
  flex: 1;

  ${media.sm} {
    margin: 0 auto;
    padding: 80px 20px;
    gap: unset;
    max-width: calc(${SUB_CONTENT_MAX_WIDTH} - 40px);
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    background: url(${bg}) center no-repeat;
    background-size: cover;
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
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();

  const { activeGameType, activeGameTypeKey, handleChangeGameType, activeNavPopupGameType } =
    useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;
  const gameTypeList = useGameTypeList();

  const isNonLobbyList: number[] = [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME];

  const isNonLobby = isNonLobbyList.includes(activeGameType);

  const getGameTypeFromKey = (key: string) => {
    const matchingGameType = gameTypeList.find((gameTypeItem) => gameTypeItem.key === key);
    return matchingGameType ? matchingGameType.gameType : null;
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

  const renderBanner = () => {
    // mobile banner
    if(isMobileSize && hasActiveMobileBanner()) {
      return (<MobileSlider />);
    }

    // desktop banner
    if(isDesktopSize && hasActiveDesktopBanner()){
      const imageUrl = activeGameTypeKey ? `${import.meta.env.BASE_URL}assets/images/home/gameType_banner/${activeGameTypeKey}.png`: "";

      return (
        <BannerWrapper>
          {!!activeGameType && !isNonLobby && <GameTypeBanner $imageUrl={imageUrl} />}
          {!activeGameType && <Banner />}
        </BannerWrapper>
      );
    }

    return null;
  }


  return (
    <MainWrapper>

      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
      {renderBanner()}

      {isDesktopSize && <Marquee />}

      <Background>
        <MainContentWrapper>
          <HeaderCard />
          <Jackpot />
          <CategoryRenderer />
        </MainContentWrapper>
      </Background>

    </MainWrapper>
  );
};

export default React.memo(HomePage);
