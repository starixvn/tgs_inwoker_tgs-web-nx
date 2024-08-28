import React, { useEffect } from "react";
import styled from "styled-components";
import { useUiStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useParams } from "react-router-dom";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import MobileSlider from "@/pages/home/components/Slider";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import Banner from "@/pages/home/components/Banner";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import notification from "@/assets/t28/images/home/notify.svg";
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
    /* max-width: ${MAIN_CONTENT_MAX_WIDTH}; */
    /* margin: 0 auto; */
    gap: unset;
    height: unset;
    padding: 24px;
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
    margin: 0 auto;
    gap: unset;
  }
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
  padding: 12px 24px;
  width: 100%;
  height: 100%;
  position: relative;
  gap: 24px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
  color: ${({ theme, $isActive }) => ($isActive ? theme.text : theme.gray50)};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${media.sm} {
    flex-direction: unset;
    background: ${({ theme }) => theme.mainBackground};
  }
  & img {
    width: 48px;
    height: 48px;
  }
`;

const HomePage = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const {
    ui: { marquees },
  } = useUiStore();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();
  const hasData = marquees && marquees.length > 0;

  const { activeGameType, handleChangeGameType, activeNavPopupGameType } = useHomeGameContext();
  const { navPopupCategoryList } = useGetLobbyCategoryList();
  const hasNavData = !!navPopupCategoryList.length;
  const gameTypeList = useGameTypeList();

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
  }, [urlGameType, gameTypeList]);

  const handleClickNav = (navItem: NavItem & { gameType: GameTypeEnum }) => {
    handleChangeGameType(navItem.gameType);
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
              // eslint-disable-next-line jsx-a11y/no-distracting-elements
              <marquee>
                {marquees.map((item, index) => {
                  const content = `
      *${item.localization !== null && item.localization.content
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
        <BannerWrapper>{isDesktopSize && <Banner />}</BannerWrapper>
      ) : null}

      <GameTypesContainer>
        {sideNavItemList &&
          sideNavItemList.map((navItem, index) => {
            return (
              <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
                <img
                  src={
                    navItem.gameType === activeGameType ? navItem.iconActiveUrl : navItem.iconUrl
                  }
                  alt={navItem.label}
                />
                <GameTypeNav $isActive={navItem.gameType === activeGameType}>
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
