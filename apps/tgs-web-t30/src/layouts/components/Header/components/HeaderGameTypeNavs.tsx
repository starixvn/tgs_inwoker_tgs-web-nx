import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import iconArrowDown from "@/assets/t30/images/header/icon-arrow-down.svg";
import Icon from "@/components/project/Icon";

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
  gap: 4px;
  padding: 5px;
  border-radius: 5px;

  ${media.sm} {
    color: ${({ theme }) => theme.white};
    padding: 18px 10px;
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
            <Icon iconUrl={iconArrowDown} width={"10px"} height={"10px"} />
          </GameTypeNav>
        );
      })}
    </HeaderGameTypesContainer>
  );
};

export default React.memo(HeaderGameTypeNavs);
