import { memo } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
  margin-left: 35px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center; 
  height: 100%;
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
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `2px solid ${theme.labelText}` : `none`)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.labelText : theme.white)};
  &:hover {
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

const GameTypeGrid = styled.div`
  margin: 0 5px;
  display: flex;
  align-self: center;
  height: 18px;
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
      {sideNavItemList && sideNavItemList.map((navItem, index) => {
        return (
          <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
            <GameTypeNav 
              $isActive={navItem.router === currentRoute}
              onMouseEnter={() => handleMouseEnter(navItem.gameType)}
              onMouseLeave={handleMouseLeave}
            >
              {navItem.label}
            </GameTypeNav>
            {index !== sideNavItemList.length - 1 && <GameTypeGrid />}
          </Wrapper>
        );
      })}
    </HeaderGameTypesContainer>
  );
};

export default memo(HeaderGameTypeNavs);
