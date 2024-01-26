import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import BalanceTracker from "@/components/project/BalanceTracker";
import AppDownloadButton from "@/components/project/AppDownloadButton";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";

const AccountNavsContainer = styled.div`
  & > div {
    margin-bottom: 15px;
  }

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

type Props = {};
const AccountNavigations = (props: Props) => {
  const history = useHistory();
  const { accountNavItemList: navItemList } = useGetNavItemList();
  const { handleLogout, logoutState } = useAuthContext();

  const handleClickNav = useCallback((navItem: NavItem) => {
    if (navItem.navType === "route") {
      history.push(navItem.routePath);
    }

    if (navItem.navType === "action") {
      navItem.callback();
    }
  }, []);

  return (
    <>
      <AccountNavsContainer>
        <BalanceTracker />

        <AccountNavCardsContainer>
          {/* Cards */}
          {navItemList.map((navItem) => {
            if (navItem.key === NavCardKey.APP_DOWNLOAD) {
              return (
                <AppDownloadButton
                  key={navItem.key}
                  navItem={navItem}
                  handleClick={handleClickNav}
                />
              );
            }

            return <NavCard key={navItem.key} navItem={navItem} handleClick={handleClickNav} />;
          })}
        </AccountNavCardsContainer>

        <LanguageSwitch />

        <Button fullWidth variant={"contained"} color={"primary"} onClick={handleLogout}>
          {i18n.t("web.header.logout")}
        </Button>
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
