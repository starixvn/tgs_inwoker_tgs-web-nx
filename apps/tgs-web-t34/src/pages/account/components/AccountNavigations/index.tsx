import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
import { NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";

const AccountNavsContainer = styled.div`
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

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey | string]: boolean };

const AccountNavigations = () => {
  const history = useHistory();
  const { navItemList } = useAccountNavigations();
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
          {navItemList.map((navItem) => {
            if (hideInDesktopDictionary[navItem.key] && isDesktopSize) return null;

            return <NavCard key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>

        {/*{isDesktopSize && (*/}
        {/*  <AccountNavCardsSubContainer>*/}
        {/*    <AppDownloadButton*/}
        {/*      navItem={navItemDictionary[NavCardKey.APP_DOWNLOAD]}*/}
        {/*      handleClick={() => handleClickNav(navItemDictionary[NavCardKey.APP_DOWNLOAD])}*/}
        {/*    />*/}

        {/*    <LanguageSwitch />*/}

        {/*    <Button*/}
        {/*      variant={"contained"}*/}
        {/*      onClick={handleLogout}*/}
        {/*      sx={{*/}
        {/*        color: "white",*/}
        {/*        background: "linear-gradient(90deg, #40434C 49.31%, #363942 49.63%)",*/}
        {/*        fontSize: "1.125rem",*/}
        {/*        height: "44px",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {i18n.t("web.header.logout")}*/}
        {/*    </Button>*/}
        {/*  </AccountNavCardsSubContainer>*/}
        {/*)}*/}
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
