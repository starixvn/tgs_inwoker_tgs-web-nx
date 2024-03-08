import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory, useLocation } from "react-router-dom";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";
import HomeIcon from "@/assets/t26/images/header/Home.svg";
import LinkIcon from "@/assets/t26/images/header/Link.svg";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
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
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  display: flex;
  align-items: center;
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
  & img {
    cursor: pointer;
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
  const history = useHistory();

  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  return (
    <HeaderGameTypesContainer>
      <HomeIconWrapper>
        <img
          src={HomeIcon}
          alt="home"
          onClick={() => {
            history.push("/");
          }}
        />
        <img
          src={LinkIcon}
          alt="link"
          onClick={() => {
            history.push("/appDownload");
          }}
        />
      </HomeIconWrapper>

      {sideNavItemList &&
        sideNavItemList.map((navItem, index) => {
          const { Icon } = navItem;

          return (
            <Wrapper
              key={navItem.key}
              onClick={() => handleClickNav(navItem)}
              onMouseEnter={() => handleMouseEnter(navItem.gameType)}
              onMouseLeave={handleMouseLeave}
            >
              <GameTypeNav $isActive={navItem.router === currentRoute}>
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
