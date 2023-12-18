import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React from "react";
import { NavCardKey } from "@tgs-web-nx/types";
import ContextMenuItem from "./ContextMenuItem";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { NavItem } from "@/hooks/account/useAccountNavigations";

const ContextMenuContainer = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  position: fixed;
  top: 45px;
  right: 45px;
  z-index: 99;
`;
const ContextMenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContextMenu = () => {
  const { accountNavItemList } = useGetNavItemList();

  const history = useHistory();

  const handleClick = async (navItem: NavItem) => {
    switch (navItem.navType) {
      case "action":
        return navItem.callback();
      case "route":
        return history.push(navItem.routePath);
    }
  };

  return (
    <ContextMenuContainer>
      <ContextMenuItemWrapper>
        {accountNavItemList.map((navItem) => {
          if (navItem.key === NavCardKey.LOGOUT) return null;

          const { label, iconUrl, iconSecondaryUrl } = navItem;
          return (
            <ContextMenuItem
              key={label}
              label={label}
              iconUrl={iconSecondaryUrl || iconUrl}
              onClick={() => handleClick(navItem)}
            />
          );
        })}
      </ContextMenuItemWrapper>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
