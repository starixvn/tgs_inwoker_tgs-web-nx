import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavCard from "./NavCard";
import NavRow from "@/pages/account/components/AccountNavigations/NavRow";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import NavRowLanguage from "@/pages/account/components/AccountNavigations/NavRowLanguage";
import { NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";

const AccountNavsContainer = styled.div`
  padding: 12px 14px;
  background: ${({ theme }) => theme.mainBackground};
  overflow: visible;
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const LogoutRegion = styled.div`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.red};
  font-size: 1.25rem;
  padding: 15px;
  text-align: center;
  margin: 9px 0 0;
  cursor: pointer;
`;

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey | string]: boolean };

const AccountNavigations = () => {
  const history = useHistory();
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const { navItemList, navItemDictionary } = useAccountNavigations();

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
    <>
      <AccountNavsContainer>
        <AccountNavCardsContainer>
          {/* mobile Cards */}
          {navItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;

            return <NavCard key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
        {/* <AccountNavCardsContainer>
          {accountNavItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;

            if (navItem.key === NavCardKey.LANGUAGE_SWITCH) {
              return (
                <NavRowLanguage key={navItem.key} navItem={navItem} handleClick={handleClickNav} />
              );
            }

            return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer> */}
      </AccountNavsContainer>

      {/* <LogoutRegion onClick={handleLogout}>{i18n.t("web.header.logout")}</LogoutRegion> */}
    </>
  );
};

export default React.memo(AccountNavigations);
