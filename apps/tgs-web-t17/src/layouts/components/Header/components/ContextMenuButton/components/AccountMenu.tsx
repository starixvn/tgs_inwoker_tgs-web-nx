import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";
import DesktopAccountMenuItem from "@/pages/account/components/AccountNavigations/DesktopAccountMenuItem";

const AccountMenuContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const AccountMenu = () => {
  const { accountNavItemList } = useGetNavItemList();
  const history = useHistory();
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
