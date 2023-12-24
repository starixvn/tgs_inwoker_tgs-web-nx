import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { NavCardKey } from "@tgs-web-nx/types";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { theme } from "@/theme";
import DarkMemberMenuHeader from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenuHeader";

const MemberMenuContainer = styled.div`
  background: ${({ theme }) => theme.menu};
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.blue : theme.menu};
  color: ${({ $isActive, theme }: MemberMenuItemProps) => ($isActive ? theme.white : theme.dae3)};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
  background: #276aa5;
  margin: 10px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${({ theme }) => theme.white};
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const DarkMemberMenu = ({ handleCloseContextMenu, ...others }: Props) => {
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
      <DarkMemberMenuHeader />

      {accountNavItemList.map((navItem) => {
        if (navItem.key === NavCardKey.LOGOUT) {
          return (
            <LogoutButton key={navItem.key} onClick={() => handleClick(navItem)}>
              <Icon iconUrl={navItem.iconUrl} width={"24px"} height={"24px"} />
              <span className={"label"}>{navItem.label}</span>
            </LogoutButton>
          );
        }
        return (
          <MemberMenuItem key={navItem.key} $isActive={false} onClick={() => handleClick(navItem)}>
            <Icon iconUrl={navItem.iconGrayUrl || navItem.iconUrl} width={"24px"} height={"24px"} />
            <span className={"label"}>{navItem.label}</span>
          </MemberMenuItem>
        );
      })}
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
