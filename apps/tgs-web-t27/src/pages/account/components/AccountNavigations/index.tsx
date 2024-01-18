import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import NavCard from "@/pages/account/components/AccountNavigations/NavCard";
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
  padding: 15px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;


  border: 1px solid green;
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

  const handleClick = (navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
        handleCloseContextMenu();
    }
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  return (
    <>
      <AccountNavsContainer>
        <AccountNavCardsContainer>
          {/* mobile MenuList */}
          {/* {sideNavItemList.map((navItem) => {
            const { key, iconComponent, label, gameType } = navItem;

            return (
              <MenuGameTab
                key={key}
                text={label}
                isActive={label === isSelected}
                onClick={() => handleClickNav(navItem)}
              >
                {iconComponent && React.createElement(iconComponent)}
              </MenuGameTab>
            );
          })} */}

          {/* 改變資料來源 使用相同的樣式 */}

          {accountNavItemList.map((navItem: NavItem) => {
            return (
              <MemberMenuItem
                key={navItem.key}
                $isActive={currentRoute === navItem.routePath?.replace("/", "")}
                onClick={() => handleClick(navItem)}
                $hoverImage={navItem.iconPrimaryUrl}
              >
                <Icon
                  iconUrl={navItem.iconSecondaryUrl || navItem.iconUrl}
                  width={"20px"}
                  height={"20px"}
                />
                <span className={"label"}>{navItem.label}</span>
              </MemberMenuItem>
            );
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
