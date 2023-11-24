import React from "react";
import styled from "styled-components";
import GameTypeNavPopup from "./GameTypeNavPopup";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
border: 2px solid blue;
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

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
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

  &:hover ${DropdownContent} {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  ${media.lg} {
    font-size: 1rem;
  }
`;

const HeaderGameTypeNavs = () => {
  const { sideNavItemList } = useGetNavItemList();

  const handleClickNav = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
  };

  return (

    <HeaderGameTypesContainer>
      {sideNavItemList.map((navItem) => {
        return (
          <GameTypeNav key={navItem.key} onClick={() => handleClickNav(navItem)}>
            {navItem.label}
          </GameTypeNav>
        );
      })}
      <DropdownContent>
        <GameTypeNavPopup />
      </DropdownContent>
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
