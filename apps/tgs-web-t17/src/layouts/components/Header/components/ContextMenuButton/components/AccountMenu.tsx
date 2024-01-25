import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";
import iconLogout from "@/assets/t19/images/account/navItemWhite/icon-logout.svg";
import ArrowRightPNG from "@/assets/t19/images/transfer/arrow-right.svg";
import DesktopAccountMenuItem from "@/pages/account/components/AccountNavigations/DesktopAccountMenuItem";

const AccountMenuContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
  $hoverImage?: string;
};

const AccountMenu = () => {
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const history = useHistory();
  const { isLogin } = useAuth();
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

  return (
    //@ts-ignore
    <AccountMenuContainer>
      {accountNavItemList.map((navItem: NavItem) => {
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
    </AccountMenuContainer>
  );
};

export default AccountMenu;
