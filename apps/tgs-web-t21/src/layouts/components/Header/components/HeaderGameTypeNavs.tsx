import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
  position: relative;
  gap: 20px;
`;

const GameTypeNav = styled.div<{
  $isActive: boolean;
}>`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 5px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  position: relative;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : `none`)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.blue60 : theme.gray70)};
  /* &:hover {
    background: ${({ theme }) => theme.gray10};
  } */

  /* ${media.lg} {
    font-size: 1rem;
  } */
`;

const Wrapper = styled.div`
  display: flex;
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
      {sideNavItemList &&
        sideNavItemList.map((navItem, index) => {
          return (
            <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
              <GameTypeNav
                $isActive={navItem.router === currentRoute}
                onMouseEnter={() => handleMouseEnter(navItem.gameType)}
                onMouseLeave={handleMouseLeave}
              >
                {navItem.label}
              </GameTypeNav>
            </Wrapper>
          );
        })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
