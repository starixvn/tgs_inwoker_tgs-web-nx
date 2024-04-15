import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  margin-left: 30px;
  margin-bottom: 5px;
  gap: 10px;
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
  cursor: pointer;
  position: relative;
  color: ${({ theme, $isActive }) => ($isActive ? theme.subNavSec : theme.primary)};
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.primary}` : `none`)};
  margin-top: ${({ $isActive }) => ($isActive ? "3px" : "0px")};
  &:hover {
    background: ${({ theme }) => theme.grey10};
  }

  ${media.lg} {
    font-size: 1rem;
  }
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
