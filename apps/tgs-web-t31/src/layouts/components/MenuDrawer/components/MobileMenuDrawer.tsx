import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import AnonymousHeaderContent from "@/layouts/components/Header/components/AnonymousHeaderContent";
import SideMenuNavItem from "@/layouts/components/MenuDrawer/components/SideMenuNavItem";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import { Button } from "@/components/UI/Button";
import { NavCardKey, NavItem } from "@/hooks/account/useAccountNavigations";
import profileImg from "@/assets/t23/images/header/sideMenuItem/icon-account.svg";
import transferImg from "@/assets/t23/images/header/sideMenuItem/icon-transfer.svg";
import reportImg from "@/assets/t23/images/header/sideMenuItem/icon-report.svg";
import inboxImg from "@/assets/t23/images/header/sideMenuItem/icon-inbox.svg";
import affiliateImg from "@/assets/t23/images/header/sideMenuItem/icon-affiliate.svg";
import downloadImg from "@/assets/t23/images/header/sideMenuItem/icon-download.svg";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  padding: 30px 25px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavsContainer = styled.div`
  padding: 12px 20px;
  height: fit-content;
`;

const MobileMenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isLogin } = useAuth();
  const history = useHistory();
  const { handleLogout } = useAuth();
  const { isDesktopSize } = useRwd();

  const handleClickLogout = async () => {
    if (!isDesktopSize && isMenuOpen) {
      handleToggleMenu(false);
    }
    await handleLogout();
  };

  const sideNavItemList: NavItem[] = useMemo(() => {
    return [
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
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        navType: "route",
        routePath: "/inbox",
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

        <LanguageSwitch style={{ marginBottom: "24px", alignSelf: "stretch" }} />

        <Button
          fullWidth
          variant={"contained"}
          onClick={handleClickLogout}
          sx={{
            fontSize: "1.562rem",
            padding: "12px 20px",
            borderRadius: "30px",
            color: "white",
            background: "linear-gradient(90deg, #40434C 49.31%, #363942 49.63%)",
          }}
        >
         {i18n.t("web.header.logout")}
        </Button>
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
