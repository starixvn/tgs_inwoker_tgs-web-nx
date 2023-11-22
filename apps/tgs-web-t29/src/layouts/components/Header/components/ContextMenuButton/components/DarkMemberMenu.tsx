import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

const MemberMenuContainer = styled.div`
  background: ${({ theme }) => theme.blue50};
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
    $isActive ? theme.gray30 : theme.blue50};
  color: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.primary : theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.blue40};
    color: ${({ theme }) => theme.white};
  }
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
      {accountNavItemList.map((navItem) => {
        return (
          <MemberMenuItem key={navItem.key} $isActive={false} onClick={() => handleClick(navItem)}>
            <Icon
              iconUrl={navItem.iconSecondaryUrl || navItem.iconUrl}
              width={"24px"}
              height={"24px"}
            />
            <span className={"label"}>{navItem.label}</span>
          </MemberMenuItem>
        );
      })}
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
