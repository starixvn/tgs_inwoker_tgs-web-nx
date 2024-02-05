import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import iconLogout from "@/assets/t21/images/account/navItem/icon-logout.svg";
import iconLogoutWhite from "@/assets/t21/images/account/navItemWhite/icon-logout.svg";

const MemberMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  width: 250px;
  flex-shrink: 0;
  border-radius: 10px;
  gap: 25px;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
  $hoverImage?: string;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 0px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme, $isActive }: MemberMenuItemProps) =>
    $isActive ? theme.primary : theme.gray30};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    img {
      content: url(${(props) => props.$hoverImage || ""});
    }
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`;

const DarkMemberMenu = () => {
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const history = useHistory();
  const { isLogin } = useAuth();
  const goToHomePage = useGoToHomePage();

  const handleClick = (navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
      // handleCloseContextMenu();
    }
  };
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };
  return (
    //@ts-ignore
    <MemberMenuContainer>
      <MenuHeader>{i18n.t("membercenter")}</MenuHeader>
      {accountNavItemList
        .filter((navItem: NavItem) => navItem.key !== NavCardKey.HOME)
        .map((navItem: NavItem) => {
          return (
            <MemberMenuItem
              key={navItem.key}
              $isActive={currentRoute === navItem.routePath?.replace("/", "")}
              onClick={() => handleClick(navItem)}
              $hoverImage={navItem.iconUrl}
            >
              <Icon
                iconUrl={
                  currentRoute === navItem.routePath?.replace("/", "")
                    ? navItem.iconUrl
                    : (navItem.iconSecondaryUrl as string)
                }
                width={"24px"}
                height={"24px"}
              />
              <span className={"label"}>{navItem.label}</span>
            </MemberMenuItem>
          );
        })}

      {isLogin && (
        <MemberMenuItem $isActive={false} onClick={handleClickLogout} $hoverImage={iconLogout}>
          <Icon iconUrl={iconLogoutWhite} width={"24px"} height={"24px"} />
          <span className={"label"}>{i18n.t("web.header.logout")}</span>
        </MemberMenuItem>
      )}
    </MemberMenuContainer>
  );
};

export default DarkMemberMenu;
