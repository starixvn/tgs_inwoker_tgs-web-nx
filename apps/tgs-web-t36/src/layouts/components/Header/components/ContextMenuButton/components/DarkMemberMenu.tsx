import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";
import DesktopAccountMenuItem from "@/pages/account/components/AccountNavigations/DesktopAccountMenuItem";
import LogoutSvg from "@/pages/account/components/AccountSvgIcon/Logout";

const MemberMenuContainer = styled.div`
  display: flex;
  width: 100%;
  /* padding: 15px 10px; */
  flex-direction: column;
  align-items: flex-start;
  background: #1a5684;
  border-radius: 4px;
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const DarkMemberMenu = ({ handleCloseContextMenu, ...others }: Props) => {
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
    <MemberMenuContainer {...others}>
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
