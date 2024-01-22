import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import AccountMenuItem from "@/pages/account/components/AccountNavigations/AccountMenuItem";
import AppDownloadButton from "@/components/project/AppDownloadButton";
import { NavItem, useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import { media } from "@/theme/breakpoints";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import MenuGameTab from "@/layouts/components/MenuDrawer/components/DesktopMenuDrawer/components/MenuGameTab";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";

const AccountNavsContainer = styled.div`
  padding: 12px 8px;

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const AccountNavCardsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 20px 0 20px;
  flex-direction: column;
  align-items: flex-start;
`;

const AccountNavCardsSubContainer = styled.div`
  display: flex;
  gap: 25px;

  & > * {
    flex: 1;
  }
`;

const LanguageSwitchWrapper = styled.div`
  margin: 0 20px;
  padding-left: 24px;
  background: ${({ theme }) => theme.mainBackground};
`;

const hideInDesktopDictionary = {
  [NavCardKey.VIP]: true,
  [NavCardKey.APP_DOWNLOAD]: true,
  [NavCardKey.LOGOUT]: true,
} as { [key in NavCardKey | string]: boolean };

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 18.5px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.darkGray : theme.pureBlack};
  color: ${({ theme }: MemberMenuItemProps) => theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.darkGray};
    color: ${({ theme }) => theme.primary};
    img {
      content: url(${props => props.$hoverImage || ""});
    }
  }
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
  $hoverImage?: string;
};

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;


const AccountNavigations = () => {
  const history = useHistory();
  const { navItemList, navItemDictionary } = useAccountNavigations();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const { sideNavItemList, accountNavItemList } = useGetNavItemList();
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
                onClick={() => handleClickNav(navItem)}
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
