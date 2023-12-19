import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import NavRowLanguage from "@/pages/account/components/AccountNavigations/NavRowLanguage";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const AccountNavsContainer = styled.div`
  padding: 12px 0;
  background: ${({ theme }) => theme.white};
  overflow: visible;
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
          {/* Cards */}
          {accountNavItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;
            if (navItem.key === NavCardKey.LANGUAGE_SWITCH) return null;

            return <NavCard key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
      </AccountNavsContainer>

      <LanguageSwitch style={{ width: "100%" }} />
    </>
  );
};

export default React.memo(AccountNavigations);
