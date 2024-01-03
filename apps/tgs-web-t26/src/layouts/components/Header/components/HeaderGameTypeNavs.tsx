import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";
import HomeIcon from "@/assets/t26/images/header/Home.svg";
import LinkIcon from "@/assets/t26/images/header/Link.svg";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
  /* overflow-x: auto; */
  position: relative;

  &::-webkit-scrollbar {
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
  gap: 5px;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : `none`)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.blue60 : theme.gray70)};
  &:hover {
    background: ${({ theme }) => theme.gray10};
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameIconWraprer = styled.div`
  display: flex;
  align-items: center;
  & svg {
    width: 20px;
    height: 20px;
  }
`;

const HomeIconWrapper = styled.div`
  display: flex;
  align-self: center;
  gap: 20px;
  margin-right: 20px;
  &img {
    width: 20px;
    height: 20px;
  }
`;

const HeaderGameTypeNavs = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { handleChangeNavPopupGameType, setIsHovered } = useHomeGameContext();

  const handleMouseEnter = (gameType: GameTypeEnum) => {
    setIsHovered(true);
    handleChangeNavPopupGameType(gameType);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickNav = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  return (
    <HeaderGameTypesContainer>
      <HomeIconWrapper>
        <img src={HomeIcon} alt="home" />
        <img src={LinkIcon} alt="link" />
      </HomeIconWrapper>

      {sideNavItemList &&
        sideNavItemList.map((navItem, index) => {
          const { Icon } = navItem;

          return (
            <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
              <GameTypeNav
                $isActive={navItem.router === currentRoute}
                onMouseEnter={() => handleMouseEnter(navItem.gameType)}
                onMouseLeave={handleMouseLeave}
              >
                <GameIconWraprer>{Icon && <Icon $color={theme.white} />}</GameIconWraprer>
                <span>{navItem.label}</span>
              </GameTypeNav>
            </Wrapper>
          );
        })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
