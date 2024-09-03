import useBanner from "@/hooks/home/useBanner";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import GameTypeNavPopup from "@/layouts/components/Header/components/GameTypeNavPopup";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Banner from "@/pages/home/components/Banner";
import CategoryRenderer from "@/pages/home/components/CategoryRenderer";
import MobileSlider from "@/pages/home/components/Slider";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  padding: 1.2rem 0.8rem;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;
`;

const BannerWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;

  ${media.lg} {
    height: 100%;
    max-height: 450px;
    BannerWrapper
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

const GameTypesContainer = styled.div`
  position: relative;
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  width: 100%;
  height: 100%;

  ${media.lg} {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const GameTypeNav = styled.div`
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  position: relative;
`;

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 10px;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.categoryBackgroundActive : theme.categoryBackground};

  ${media.sm} {
    flex-direction: unset;
  }

  & img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const HomePage = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { gameType: urlGameType } = useParams<{ gameType: string }>();
  const { hasActiveDesktopBanner, hasActiveMobileBanner } = useBanner();

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
      {!!activeNavPopupGameType && hasNavData && <GameTypeNavPopup />}
      {isMobileSize && hasActiveMobileBanner() && <MobileSlider />}
      {hasActiveDesktopBanner() ? (
        <BannerWrapper>{isDesktopSize && <Banner />}</BannerWrapper>
      ) : null}

      <GameTypesContainer>
        {sideNavItemList &&
          sideNavItemList.map((navItem, index) => {
            const isActive = navItem.gameType === activeGameType;

            return (
              <Wrapper
                $isActive={isActive}
                key={navItem.key}
                onClick={() => handleClickNav(navItem)}
              >
                <img src={navItem.iconUrl} alt={navItem.label} />
                <GameTypeNav>{navItem.label}</GameTypeNav>
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
