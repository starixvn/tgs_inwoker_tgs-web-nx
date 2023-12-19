import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import { theme } from "@/theme";

const MemberMenuContainer = styled.div``;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ $isActive, theme }: MemberMenuItemProps) => ($isActive ? theme.white : theme.black)};
  background: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.black : theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ $isActive, theme }: MemberMenuItemProps) =>
      $isActive ? theme.grey02 : theme.black};
    color: ${({ theme }) => theme.white}
`;
type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const AccountNavList = ({ handleCloseContextMenu, ...others }: Props) => {
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
        if (navItem.navType !== "route") return null;

        const isActive = history.location.pathname.includes(navItem.routePath);
        return (
          <MemberMenuItem
            key={navItem.key}
            $isActive={isActive}
            onClick={() => handleClick(navItem)}
          >
            <Icon
              iconUrl={isActive ? navItem.iconActiveUrl ?? navItem.iconUrl : navItem.iconUrl}
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

export default AccountNavList;
