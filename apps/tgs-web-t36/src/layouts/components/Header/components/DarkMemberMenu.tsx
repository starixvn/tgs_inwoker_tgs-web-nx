import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { useAccountStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";
import DesktopAccountMenuItem from "@/pages/account/components/AccountNavigations/DesktopAccountMenuItem";
import LogoutSvg from "@/pages/account/components/AccountSvgIcon/Logout";
import UserBanner from "@/assets/t36/images/account/banner.png";

const MemberMenuContainer = styled.div`
  display: flex;
  width: 258px;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  background: #1a5684;
  border-radius: 4px;
`;

const UserBannerContainer = styled.div`
  width: 100%;
  background-image: url(${UserBanner});
  background-repeat: no-repeat;
  aspect-ratio: 258/100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  padding: 10px;
  & > div {
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #76b7ec;
  }
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const DarkMemberMenu = ({ handleCloseContextMenu, ...others }: Props) => {
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { isLogin } = useAuth();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const handleClickNav = useCallback((navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
    }
  }, []);

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  const username = account.info.member_username;
  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  return (
    //@ts-ignore
    <MemberMenuContainer {...others}>
      <UserBannerContainer>
        {/* <div>{`Welcome, ${username}`}</div> */}
        {/* <div>{`${config.currency}$ ${currentBalance}`}</div> */}
      </UserBannerContainer>
      {accountNavItemList.map((navItem: NavItem) => {
        if (navItem.key === NavCardKey.LOGOUT) return null;
        const { key, iconComponent, label } = navItem;
        return (
          <DesktopAccountMenuItem
            key={key}
            text={label}
            isActive={currentRoute === navItem.routePath?.replace("/", "")}
            onClick={() => handleClickNav(navItem)}
          >
            {iconComponent && React.createElement(iconComponent)}
          </DesktopAccountMenuItem>
        );
      })}

      {isLogin && (
        <Button
          sx={{
            margin: "10px 0",
            width: "100%",
          }}
          onClick={handleLogout}
        >
          <LogoutSvg $color={theme.white} />
          {i18n.t("web.header.logout")}
        </Button>
      )}
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
