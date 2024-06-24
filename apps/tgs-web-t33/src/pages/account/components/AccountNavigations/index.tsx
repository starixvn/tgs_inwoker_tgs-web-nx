import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavRow from "../NavRow";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
import { NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const AccountNavsContainer = styled.div`
  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
`;

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey | string]: boolean };

const AccountNavigations = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { accountNavItemList } = useGetNavItemList();

  const handleClickNav = useCallback((navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
    }
  }, []);

  return (
    <AccountNavsContainer>
      <AccountNavCardsContainer>
        {accountNavItemList.map((navItem) => {
          if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;

          return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
        })}
      </AccountNavCardsContainer>
    </AccountNavsContainer>
  );
};

export default React.memo(AccountNavigations);
