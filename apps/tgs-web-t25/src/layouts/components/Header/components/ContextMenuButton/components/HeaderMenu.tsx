import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import MemberMenuHeader from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenuHeader";
import { theme } from "@/theme";

const MemberMenuContainer = styled.div`
  position: fixed;
  top: 44px;
  right: 25px;
  z-index: 99;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  font-size: 0.875rem;
  font-weight: 600;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: ${({ $isActive, theme }) => theme.white};
  background: ${({ $isActive, theme }: MemberMenuItemProps) => theme.black02};
  cursor: pointer;
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const HeaderMenu = ({ handleCloseContextMenu, ...others }: Props) => {
  const { accountNavItemList } = useGetNavItemList();
  const history = useHistory();

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

  return (
    //@ts-ignore
    <MemberMenuContainer {...others}>
      <MemberMenuHeader />

      {accountNavItemList.map((navItem) => {
        return (
          <MemberMenuItem key={navItem.key} $isActive={false} onClick={() => handleClick(navItem)}>
            <Icon iconUrl={navItem.iconUrl || ""} width={"24px"} height={"24px"} />
            <span className={"label"}>{navItem.label}</span>
          </MemberMenuItem>
        );
      })}
    </MemberMenuContainer>
  );
};

export default HeaderMenu;
