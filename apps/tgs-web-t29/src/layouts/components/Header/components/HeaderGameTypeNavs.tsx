import React, { useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import GameTypeNavPopup from "./GameTypeNavPopup";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 100%;
  overflow-x: scroll;
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

const DropdownContent = styled.div<{ $isHovered: boolean }>`
  display: ${($isHovered) => ($isHovered ? "block" : "none")};
  position: absolute
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.gray10};
  z-index: 1;
`;

const GameTypeNav = styled.div`
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 5px;
  color: ${({ theme }) => theme.gray50};
  cursor: pointer;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.gray10};
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

const HeaderGameTypeNavs = () => {
  const { sideNavItemList } = useGetNavItemList();
  const [isHovered, setIsHovered] = useState(false);
  const { activeGameType, handleChangeGameType } = useHomeGameContext();

  const handleMouseEnter = (gameType: GameTypeEnum) => {
    setIsHovered(true);
    handleChangeGameType(gameType);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickNav = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (

    <HeaderGameTypesContainer>
      {sideNavItemList.map((navItem) => {
        return (
          <GameTypeNav key={navItem.key} onClick={() => handleClickNav(navItem)}
            onMouseEnter={() => handleMouseEnter(navItem.gameType)}
            onMouseLeave={handleMouseLeave}
          >
            {navItem.label}
            {isHovered && (
              <DropdownContent $isHovered={isHovered}>
                <GameTypeNavPopup />
              </DropdownContent>
            )}
          </GameTypeNav>
        );
      })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
