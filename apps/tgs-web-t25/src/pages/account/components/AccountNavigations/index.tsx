import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavRow from "@/pages/account/components/AccountNavigations/NavRow";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import NavRowLanguage from "@/pages/account/components/AccountNavigations/NavRowLanguage";

const AccountNavsContainer = styled.div`
  padding: 12px 14px;
  overflow: visible;
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

const LogoutRegion = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.black};
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

            if (navItem.key === NavCardKey.LANGUAGE_SWITCH) {
              return (
                <NavRowLanguage key={navItem.key} navItem={navItem} handleClick={handleClickNav} />
              );
            }

            return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
      </AccountNavsContainer>

      <LogoutRegion onClick={handleLogout}>{i18n.t("web.header.logout")}</LogoutRegion>
    </>
  );
};

export default React.memo(AccountNavigations);
