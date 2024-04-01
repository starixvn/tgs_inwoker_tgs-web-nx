import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import AccountMenuItem from "@/pages/account/components/AccountNavigations/AccountMenuItem";
import { NavItem } from "@/hooks/account/useAccountNavigations";
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
  width: 100%;
  flex-wrap: wrap;
  gap: 12px 10px;
  margin-bottom: 20px;
`;

const LanguageSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.mainBackground};
`;

const AccountNavigations = () => {
  const history = useHistory();
  const { accountNavItemList } = useGetNavItemList();
  const [isSelected, setIsSelected] = useState();

  const handleClickNav = useCallback((navItem: NavItem) => {
    setIsSelected(navItem.label);

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
          {/* mobile account menuList */}
          {accountNavItemList.map((navItem) => {
            const { key, iconComponent, label } = navItem;

            return (
              <AccountMenuItem
                key={key}
                text={label}
                isActive={label === isSelected}
                onClick={() => handleClickNav(navItem as NavItem)}
              >
                {iconComponent && React.createElement(iconComponent)}
              </AccountMenuItem>
            );
          })}
        </AccountNavCardsContainer>
        <LanguageSwitchWrapper>
          <LanguageSwitch />
        </LanguageSwitchWrapper>

        {/* 
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
        )} */}
      </AccountNavsContainer>

      {/*<Loading show={logoutState.isLoading} />*/}
    </>
  );
};

export default React.memo(AccountNavigations);
