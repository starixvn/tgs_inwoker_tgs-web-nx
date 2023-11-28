import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import SideMenuNavItem from "@/layouts/components/MenuDrawer/components/SideMenuNavItem";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import promotionImg from "@/assets/t34/images/header/sideMenuItem/icon-promotion.svg";
import profileImg from "@/assets/t34/images/header/sideMenuItem/icon-account.svg";
import transferImg from "@/assets/t34/images/header/sideMenuItem/icon-transfer.svg";
import depositImg from "@/assets/t34/images/header/sideMenuItem/icon-deposit.svg";
import withdrawImg from "@/assets/t34/images/header/sideMenuItem/icon-withdraw.svg";
import MenuGameTypeList from "@/layouts/components/MenuDrawer/components/MenuGameTypeList";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  height: fit-content;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
`;

const NavsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MenuDrawerNavList = () => {
  const { handleToggleMenu } = useHeader();
  const history = useHistory();

  const sideNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROMOTION,
        label: i18n.t("common.promotion"),
        iconUrl: promotionImg,
        navType: "route",
        routePath: "/promotion-list",
      },
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        navType: "route",
        routePath: "/account",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        navType: "route",
        routePath: "/withdrawal",
      },
    ] as NavItem[];
  }, []);

  const handleClickNav = useCallback((navItem: NavItem) => {
    handleToggleMenu(false);

    if (navItem.navType !== "route") return;
    history.push(navItem.routePath);
  }, []);

  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />
      <MenuGameTypeList />

      <ContentWrapper>
        <NavsContainer>
          {sideNavItemList.map((navItem) => {
            return (
              <SideMenuNavItem key={navItem.key} navItem={navItem} handleClick={handleClickNav} />
            );
          })}
        </NavsContainer>
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MenuDrawerNavList;
