import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth } from "@tgs-web-nx/core/features";
import NavRow from "@/pages/account/components/AccountNavigations/NavRow";
import { NavCardKey, NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";

const AccountNavsContainer = styled.div`
  padding: 12px 14px;
  background: ${({ theme }) => theme.white};

  & > div {
    margin-bottom: 20px;
  }
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoutRegion = styled.div`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.red};
  font-size: 1.25rem;
  padding: 15px;
  text-align: center;
  margin: 9px 0 50px;
  cursor: pointer;
`;

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey | string]: boolean };

const AccountNavigations = () => {
  const history = useHistory();
  const { navItemList } = useAccountNavigations();
  const { handleLogout } = useAuth();
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
          {navItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;

            return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
      </AccountNavsContainer>

      <LogoutRegion onClick={handleLogout}>{i18n.t("web.header.logout")}</LogoutRegion>
    </>
  );
};

export default React.memo(AccountNavigations);
