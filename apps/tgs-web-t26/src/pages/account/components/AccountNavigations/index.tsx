import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavRow from "@/pages/account/components/AccountNavigations/NavRow";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
// import NavRowLanguage from "@/pages/account/components/AccountNavigations/NavRowLanguage";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";

const MainContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 12px 0;
  min-height: 795px;
`;

const AccountNavsContainer = styled.div`
  padding: 12px 14px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  background: ${({ theme }) => theme.darkGray};
  padding: 20px 50px;
  border-radius: 10px;
  gap: 20px;
`;

const LanguageSwitchContainer = styled.div`
  background: ${({ theme }) => theme.darkGray};
  margin: 0 14px;
`;

const LogoutRegion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  height: 50px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 400;
  line-height: 26px;
  margin: 10px 14px;
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

  const sortAccountNavItemList = accountNavItemList.filter((item) => {
    return item.key !== NavCardKey.CONTACT_US && item.key !== NavCardKey.APP_DOWNLOAD;
  });

  const otherAccountNavItemList = accountNavItemList.filter((item) => {
    return item.key === NavCardKey.CONTACT_US || item.key === NavCardKey.APP_DOWNLOAD;
  });

  const handleClickNav = useCallback((navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <AccountNavsContainer>
        <AccountNavCardsContainer>
          {/* Cards */}
          {sortAccountNavItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;
            return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
        <AccountNavCardsContainer>
          {otherAccountNavItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;
            return <NavRow key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>
      </AccountNavsContainer>
      <LanguageSwitchContainer>
        <MenuLanguageSwitch />
      </LanguageSwitchContainer>

      <LogoutRegion onClick={handleLogout}>{i18n.t("web.header.logout")}</LogoutRegion>
    </MainContainer>
  );
};

export default React.memo(AccountNavigations);
