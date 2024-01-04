import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore, useUiStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import { Button, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import Marquee from "./components/CardPrompt/components/Marquee";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import MobileSlider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import bg from "@/assets/t29/images/home/home_bg.png";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import notification from "@/assets/t26/images/home/notify.svg";
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
  padding: 0px 8px 12px 8px;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    /* max-width: ${MAIN_CONTENT_MAX_WIDTH}; */
    margin: 0 auto;
    gap: unset;
    height: unset;
    padding: 0px 0px 0px 0px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    gap: unset;
    /* background-image: url(${bg}); */
    background-size: unset;
    background-repeat: repeat;
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

const MarqueeContainer = styled.div`
  position: relative;
  overflow: visible;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.875rem;
  padding: 10px;
  color: ${({ theme }) => theme.white};
  background: #1c1e22;
  margin: 46px 0 30px 0;
`;

const MarqueeContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BasicButton = muiStyled(Button)(({ theme }) => ({
  width: "100%",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0em",
  color: theme.palette.text.primary,
}));

const DepositButton = muiStyled(BasicButton)(({ theme }) => ({
  background: "linear-gradient(270deg, #BD2D01 -1.87%, #F58200 100%)",
}));

const WithdrawButton = muiStyled(BasicButton)(({ theme }) => ({
  background: `linear-gradient(270deg, #936F29 -1.87%, #F2BF5F 100%)`,
}));

const HomePage = () => {
  const { general } = useGeneralStore();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const {
    ui: { marquees },
  } = useUiStore();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();
  const hasData = marquees && marquees.length > 0;

  const { activeGameType, activeGameTypeKey, handleChangeGameType, activeNavPopupGameType } =
    useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;
  const history = useHistory();
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
  return (
    <MainWrapper>
      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
      {isMobileSize && <CardPrompt />}
      {isMobileSize && hasActiveMobileBanner() && <MobileSlider />}
      {hasActiveDesktopBanner() ? (
        <BannerWrapper>
          {isDesktopSize && !!activeGameType && !isNonLobby && (
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
          {isDesktopSize && !activeGameType && <Banner />}
        </BannerWrapper>
      ) : null}
      {isMobileSize && (
        <ButtonContainer>
          <DepositButton>{i18n.t("common.deposit")}</DepositButton>
          <WithdrawButton>{i18n.t("common.withdrawal")}</WithdrawButton>
        </ButtonContainer>
      )}
      <MainContentWrapper>
        {isDesktopSize && !activeGameType && (
          <MarqueeContainer>
            <MarqueeContent>
              <Marquee />
            </MarqueeContent>
          </MarqueeContainer>
        )}
        <CategoryRenderer />
      </MainContentWrapper>
      
    </MainWrapper>
  );
};

export default React.memo(HomePage);
