import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

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

const GameTypeNav = styled.div`
  flex-shrink: 0;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  position: relative;
  &:hover {
    background: ${({ theme }) => theme.gray10};
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
  // const { handleChangeNavPopupGameType, setIsHovered } = useHomeGameContext();

  // const handleMouseEnter = (gameType: GameTypeEnum) => {
  //   setIsHovered(true);
  //   handleChangeNavPopupGameType(gameType);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  const handleClickNav = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (
    <HeaderGameTypesContainer>
      {sideNavItemList &&
        sideNavItemList.map((navItem, index) => {
          return (
            <Wrapper key={navItem.key} onClick={() => handleClickNav(navItem)}>
              <GameTypeNav
              // $isActive={navItem.router === currentRoute}
              // onMouseEnter={() => handleMouseEnter(navItem.gameType)}
              // onMouseLeave={handleMouseLeave}
              >
                <img src={navItem.iconUrl} alt={navItem.label} />
                <div>{navItem.label}</div>
              </GameTypeNav>
            </Wrapper>
          );
        })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
