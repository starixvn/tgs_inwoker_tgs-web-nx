import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth } from "@tgs-web-nx/core/features";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/project/AppDownloadButton";
import { NavCardKey, NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";

const AccountNavsContainer = styled.div`
  padding: 12px 14px;

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const AccountNavCardsSubContainer = styled.div`
  display: flex;
  gap: 25px;

  & > * {
    flex: 1;
  }
`;

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey]: boolean };

const AccountNavigations = () => {
  const history = useHistory();
  const { navItemList, navItemDictionary } = useAccountNavigations();
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

            return <NavCard key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>

        {isDesktopSize && (
          <AccountNavCardsSubContainer>
            <AppDownloadButton
              navItem={navItemDictionary[NavCardKey.APP_DOWNLOAD]}
              handleClick={() => handleClickNav(navItemDictionary[NavCardKey.APP_DOWNLOAD])}
            />

            <LanguageSwitch />

            <Button
              variant={"contained"}
              onClick={handleLogout}
              sx={{
                color: "white",
                background: "linear-gradient(90deg, #40434C 49.31%, #363942 49.63%)",
                fontSize: "1.125rem",
                height: "44px",
              }}
            >
             {i18n.t("web.header.logout")}
            </Button>
          </AccountNavCardsSubContainer>
        )}
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
