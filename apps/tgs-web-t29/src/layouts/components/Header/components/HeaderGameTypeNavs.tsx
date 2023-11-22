import React, { useMemo } from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  //gap: 10px;
  height: 40px;
`;

const GameTypeNav = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  //height: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.gray10};
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
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
