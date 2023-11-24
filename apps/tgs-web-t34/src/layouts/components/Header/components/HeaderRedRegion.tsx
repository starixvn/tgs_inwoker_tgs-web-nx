import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { NavCardKey, NavItem } from "@/hooks/account/useAccountNavigations";

const HeaderRedRegionContainer = styled.div`
  background: ${({ theme }) => theme.primary};
`;

const Wrapper = styled.div`
  height: 32px;
  max-width: 1200px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: auto;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.white};
  font-size: 0.812rem;
  border-right: 2px solid ${({ theme }) => theme.white};
  padding-right: 12px;
  border-right-style: dashed;

  &:last-child {
    border-right: none;
  }
`;

const HeaderRedRegion = () => {
  const { headerNavItemList } = useGetNavItemList();
  const { handleChangeGameType } = useHomeGameContext();

  const handleClickLink = (navItem: NavItem) => {
    if (!navItem.key === NavCardKey.HOME) return;

    handleChangeGameType(GameTypeEnum.NONE);
  };

  return (
    <HeaderRedRegionContainer>
      <Wrapper>
        {headerNavItemList.map((navItem) => {
          if (navItem.navType !== "route") return null;

          return (
            <NavLink
              key={navItem.key}
              to={navItem.routePath}
              onClick={() => handleClickLink(navItem)}
            >
              {navItem.label}
            </NavLink>
          );
        })}
      </Wrapper>
    </HeaderRedRegionContainer>
  );
};

export default HeaderRedRegion;
