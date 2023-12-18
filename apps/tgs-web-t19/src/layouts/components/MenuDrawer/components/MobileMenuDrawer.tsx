import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { NavCardKey } from "@tgs-web-nx/types";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import AnonymousHeaderContent from "@/layouts/components/Header/components/AnonymousHeaderContent";
import SideMenuNavItem from "@/layouts/components/MenuDrawer/components/SideMenuNavItem";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import vipImg from "@/assets/t19/images/header/sideMenuItem/icon-vip.svg";
import profileImg from "@/assets/t19/images/header/sideMenuItem/icon-account.svg";
import transferImg from "@/assets/t19/images/header/sideMenuItem/icon-transfer.svg";
import reportImg from "@/assets/t19/images/header/sideMenuItem/icon-report.svg";
import inboxImg from "@/assets/t19/images/header/sideMenuItem/icon-inbox.svg";
import affiliateImg from "@/assets/t19/images/header/sideMenuItem/icon-affiliate.svg";
import downloadImg from "@/assets/t19/images/header/sideMenuItem/icon-download.svg";
import logoutImg from "@/assets/t19/images/header/sideMenuItem/icon-log-out.svg";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import Icon from "@/components/project/Icon";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  padding: 27px 20px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavsContainer = styled.div`
  padding: 12px 20px;
  height: fit-content;
`;

const LanguageSwitchWrapper = styled.div`
  width: 100%;
  height: 76px;
  padding: 12px 0 24px 0;
`;

const LogoutBtnWrapper = styled.div`
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-top: 1px solid ${({ theme }) => theme.primary};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.125rem;
  font-weight: 510;
`;

const MobileMenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLogin } = useAuth();
  const history = useHistory();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();

  const handleClickLogout = async () => {
    if (!isDesktopSize && isMenuOpen) {
      handleToggleMenu(false);
    }
    await handleLogout();
  };

  const sideNavItemList: NavItem[] = useMemo(() => {
    return [
      // {
      //   key: NavCardKey.PROFILE,
      //   label: i18n.t("wap.main.my"),
      //   iconUrl: profileImg,
      //   navType: "route",
      //   routePath: "/account",
      // },
      {
        key: NavCardKey.VIP,
        label: "vip",
        iconUrl: vipImg,
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        navType: "route",
        routePath: "/message-center",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        navType: "route",
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: profileImg,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        navType: "route",
        routePath: "/appDownload",
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

      <ContentWrapper>
        {isLogin ? (
          <TransferButtonGroup buttonWidth={"140px"} />
        ) : (
          <AnonymousHeaderContent buttonWidth={"140px"} />
        )}

        <NavsContainer>
          {sideNavItemList.map((navItem) => {
            return (
              <SideMenuNavItem key={navItem.key} navItem={navItem} handleClick={handleClickNav} />
            );
          })}
        </NavsContainer>

        <LanguageSwitchWrapper>
          <LanguageSwitch style={{ marginBottom: "24px", alignSelf: "stretch" }} />
        </LanguageSwitchWrapper>

        <LogoutBtnWrapper
          onClick={handleClickLogout}
        >
          <Icon
            iconUrl={logoutImg}
            width={"18px"}
            height={"17px"}
          />
          <Text>{i18n.t("web.header.logout")}</Text>
        </LogoutBtnWrapper>
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
