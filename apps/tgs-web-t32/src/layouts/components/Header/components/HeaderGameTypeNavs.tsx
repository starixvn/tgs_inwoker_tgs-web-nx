import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import IconArrow from "@/assets/t32/images/header/icon-arrow-down.svg";
import Icon from "@/components/project/Icon";

const HeaderGameTypesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
  overflow-x: auto;
  position: relative;

  &::-webkit-scrollbar {
    //height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.mainBackground};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.maskBlack20};
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
  padding: 10px 12px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  position: relative;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : `none`)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.blue60 : theme.gray70)};
  gap: 6px;
  &:hover {
    background: ${({ theme }) => theme.footerBGC};
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
            <GameTypeNav
              key={navItem.key}
              $isActive={navItem.router === currentRoute}
              onMouseEnter={() => handleMouseEnter(navItem.gameType)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClickNav(navItem)}
            >
              {navItem.label}
              <Icon iconUrl={IconArrow} width={"10px"} height={"10px"} />
            </GameTypeNav>
          );
        })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
