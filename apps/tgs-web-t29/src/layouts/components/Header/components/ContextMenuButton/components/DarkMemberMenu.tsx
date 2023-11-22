import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";
import iconLogout from "@/assets/t29/images/account/navItemWhite/icon-logout.svg";

const MemberMenuContainer = styled.div`
  background: ${({ theme }) => theme.blue50};
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 10px 24px;
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

      <Button
        sx={{
          margin: " 15px 10px 0",
          width: "180px",
        }}
      >
        <Icon iconUrl={iconLogout} width={"24px"} height={"24px"} style={{ marginRight: "10px" }} />
        {i18n.t("web.header.logout")}
      </Button>
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
