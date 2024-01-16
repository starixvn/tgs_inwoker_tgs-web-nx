import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";
import { Button } from "@/components/UI/Button";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberMenuContainer = styled.div`
  background: ${({ theme }) => theme.darkGray};
  border-radius: 10px;
  width: 280px;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
  theme: typeof theme;
  $hoverImage?: string;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  padding: 18.5px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme, $isActive }: MemberMenuItemProps) =>
    $isActive ? theme.primary : theme.white};
  cursor: pointer;

  /* &:hover {
    background: ${({ theme }) => theme.darkGray};
    color: ${({ theme }) => theme.primary};
    img {
      content: url(${(props) => props.$hoverImage || ""});
    }
  } */
`;

const DarkMemberMenu = () => {
  const { accountNavItemList } = useGetNavItemList();
  const { handleLogout } = useAuthContext();
  const history = useHistory();
  const { isLogin } = useAuth();
  const handleClick = (navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
    }
  };

  const sortAccountNavItemList = accountNavItemList.filter((item) => {
    return item.key !== NavCardKey.CONTACT_US && item.key !== NavCardKey.APP_DOWNLOAD;
  });

  const otherAccountNavItemList = accountNavItemList.filter((item) => {
    return item.key === NavCardKey.CONTACT_US || item.key === NavCardKey.APP_DOWNLOAD;
  });

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  type IconProps = {
    $color: string;
  };
  return (
    //@ts-ignore
    <MainContainer>
      <MemberMenuContainer>
        {sortAccountNavItemList.map((navItem: NavItem) => {
          const Icon = navItem.Icon as React.FC<IconProps>;
          return (
            <MemberMenuItem
              key={navItem.key}
              $isActive={currentRoute === navItem.routePath?.replace("/", "")}
              onClick={() => handleClick(navItem)}
            >
              <Icon
                $color={
                  currentRoute === navItem.routePath?.replace("/", "") ? theme.primary : theme.white
                }
              />
              <span className={"label"}>{navItem.label}</span>
            </MemberMenuItem>
          );
        })}
      </MemberMenuContainer>
      <MemberMenuContainer>
        {otherAccountNavItemList.map((navItem: NavItem) => {
          const Icon = navItem.Icon as React.FC<IconProps>;
          return (
            <MemberMenuItem
              key={navItem.key}
              $isActive={currentRoute === navItem.routePath?.replace("/", "")}
              onClick={() => handleClick(navItem)}
            >
              <Icon
                $color={
                  currentRoute === navItem.routePath?.replace("/", "") ? theme.primary : theme.white
                }
              />
              <span className={"label"}>{navItem.label}</span>
            </MemberMenuItem>
          );
        })}
      </MemberMenuContainer>
      <MemberMenuContainer>
        <MenuLanguageSwitch />
      </MemberMenuContainer>
      {isLogin && (
        <Button
          sx={{
            width: "100%",
            height: "44px",
            color: theme.black,
            borderRadius: "10px",
          }}
          onClick={handleLogout}
        >
          {i18n.t("web.header.logout")}
        </Button>
      )}
    </MainContainer>
  );
};

export default DarkMemberMenu;
