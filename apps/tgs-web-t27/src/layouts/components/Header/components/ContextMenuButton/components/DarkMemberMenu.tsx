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

const MemberMenuContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.g7};
  border-radius: 4px;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
  $hoverImage?: string;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 18.5px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.darkGray : theme.pureBlack};
  color: ${({ theme }: MemberMenuItemProps) => theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.darkGray};
    color: ${({ theme }) => theme.primary};
    img {
      content: url(${props => props.$hoverImage || ""});
    }
  }
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const DarkMemberMenu = ({ handleCloseContextMenu, ...others }: Props) => {
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const history = useHistory();
  const { isLogin } = useAuth();
  const [isSelected, setIsSelected] = useState();

  const handleClickNav = useCallback((navItem: NavItem) => {
    setIsSelected(navItem.label);

    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
    }
  }, []);

  return (
    //@ts-ignore
    <MemberMenuContainer {...others}>
      {accountNavItemList.map((navItem: NavItem) => {
        const { key, iconComponent, label } = navItem;
        return (
          <DesktopAccountMenuItem
            key={key}
            text={label}
            isActive={label === isSelected}
            onClick={() => handleClickNav(navItem)}
          >
            {iconComponent && React.createElement(iconComponent)}
          </DesktopAccountMenuItem>
        );
      })}

      {/* {isLogin && (
        <Button
          sx={{
            margin: " 15px 10px 0",
            width: "180px",
          }}
          onClick={handleLogout}
        >
          <Icon
            iconUrl={iconLogout}
            width={"24px"}
            height={"24px"}
            style={{ marginRight: "10px" }}
          />
          {i18n.t("web.header.logout")}
        </Button>
      )} */}
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
