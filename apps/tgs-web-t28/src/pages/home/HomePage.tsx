import React, { useEffect } from "react";
import styled from "styled-components";
import { useGeneralStore, useUiStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useParams } from "react-router-dom";
import CardPrompt from "@/pages/home/components/CardPrompt";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import MobileSlider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import bg from "@/assets/t29/images/home/home_bg.png";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import notification from "@/assets/t28/images/home/notify.svg";
import Jackpot from "@/components/project/Jackpot";
import useBanner from "@/hooks/home/useBanner";
import OnlineUser from "@/pages/home/components/CardPrompt/components/OnlineUser";
import { theme } from "@/theme";
import BN from "@/assets/t28/images/home/BN.png";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

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
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
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

const HomepageImgWrapper = styled(BannerWrapper)`
  max-height: 450px;
  width: auto;
  height: auto;
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
  /* justify-content: center; */
  align-items: center;
  gap: 7px;
  font-size: 0.875rem;
  padding: 10px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.darkPurple};
  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
  }
`;

const MarqueeContent = styled.div`
  display: flex;
  align-items: center;
`;

const MarqueesBackground = styled.div`
  display: inline;
  overflow: visible;
`;

const GameTypesContainer = styled.div`
  display: flex;
  padding: 0 24px;
  /* margin-right: auto; */
  /* flex-wrap: nowrap;
  align-items: stretch; */
  height: 100%;
  position: relative;
  gap: 24px;

  /* &::-webkit-scrollbar {
    //height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.mainBackground};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.gray10};
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  } */
`;

const GameTypeNav = styled.div<{
  $isActive: boolean;
}>`
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : `none`)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.blue60 : theme.gray70)};
  &:hover {
    background: ${({ theme }) => theme.gray10};
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

const GameTypeGrid = styled.div`
  align-self: center;
  height: 18px;
  display: flex;
  border: 1px solid #cccccc;
  margin: 0 5px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const HomePage = () => {
  const { general } = useGeneralStore();
  const { sideNavItemList } = useGetNavItemList();
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

  const handleClickNav = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (
    <MainWrapper>
      {isDesktopSize && (
        <HomepageImgWrapper>
          <img src={BN} alt="homeImg" width={"100%"} height={"100%"} />
        </HomepageImgWrapper>
      )}
      {
        <MarqueeContainer>
          <MarqueeContent>
            <OnlineUser color={theme.text} />
            <img src={notification} alt="marquee" />
            {hasData && (
              // Disable TypeScript check for unknown HTML elements
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <marquee>
                {marquees.map((item, index) => {
                  const content = `
      *${
        item.localization !== null && item.localization.content
          ? item.localization.content
          : item.content
      }
      `;
                  return <MarqueesBackground key={index}>{content}</MarqueesBackground>;
                })}
                {/*@ts-ignore*/}
              </marquee>
            )}
          </MarqueeContent>
        </MarqueeContainer>
      }
      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
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

      {isMobileSize && <CardPrompt />}
      <GameTypesContainer>
        {sideNavItemList &&
          sideNavItemList.map((navItem, index) => {
            return (
              <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
                <img src={navItem.iconUrl} alt={navItem.label} />
                <GameTypeNav
                  $isActive={false}
                  // onMouseEnter={() => handleMouseEnter(navItem.gameType)}
                  // onMouseLeave={handleMouseLeave}
                >
                  {navItem.label}
                </GameTypeNav>
              </Wrapper>
            );
          })}
      </GameTypesContainer>
      <MainContentWrapper>
        <CategoryRenderer />
      </MainContentWrapper>
    </MainWrapper>
  );
};

export default React.memo(HomePage);
