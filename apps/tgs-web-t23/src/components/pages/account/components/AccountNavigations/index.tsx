import React, { useCallback, useEffect } from "react";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import styled from "styled-components";
import NavCard from "@/components/pages/account/components/AccountNavigations/NavCard";
import AppDownloadButton from "@/components/project/AppDownloadButton";
import { useHistory } from "react-router";
import { NavItem, NavCardKey, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import i18n from "@/utils/i18n";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuth } from "@/core/feature/useAuth";

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

type Props = {};
const AccountNavigations = (props: Props) => {
  const history = useHistory();
  const { navItemList, navItemDictionary } = useAccountNavigations();
  const { handleLogout, logoutState } = useAuth();
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
              <>{i18n.t("web.header.logout")}</>
            </Button>
          </AccountNavCardsSubContainer>
        )}
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
