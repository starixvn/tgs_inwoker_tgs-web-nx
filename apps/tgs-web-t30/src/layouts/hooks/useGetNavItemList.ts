import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import accountIcon from "@/assets/t30/images/menuDrawer/icon-account.svg";
import depositIcon from "@/assets/t30/images/menuDrawer/icon-deposit.svg";
import withdrawIcon from "@/assets/t30/images/menuDrawer/icon-withdraw.svg";
import transferIcon from "@/assets/t30/images/menuDrawer/icon-transfer.svg";
import reportIcon from "@/assets/t30/images/menuDrawer/icon-report.svg";
import inboxIcon from "@/assets/t30/images/menuDrawer/icon-inbox.svg";
import affiliateIcon from "@/assets/t30/images/menuDrawer/icon-affiliate.svg";
import vipIcon from "@/assets/t30/images/menuDrawer/icon-vip.svg";
import contactIcon from "@/assets/t30/images/menuDrawer/icon-contact.svg";
import downloadIcon from "@/assets/t30/images/menuDrawer/icon-download.svg";
import logoutIcon from "@/assets/t30/images/menuDrawer/icon-logout.svg";
import accountSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-account.svg";
import depositSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-deposit.svg";
import withdrawSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-withdraw.svg";
import transferSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-transfer.svg";
import reportSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-report.svg";
import inboxSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-inbox.svg";
import affiliateSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-affiliate.svg";
import vipSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-vip.svg";
import contactSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-contact.svg";
import downloadSecondaryIcon from "@/assets/t30/images/menuDrawer/blue/icon-download.svg";
import accountGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-account.svg";
import depositGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-deposit.svg";
import withdrawGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-withdraw.svg";
import transferGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-transfer.svg";
import reportGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-report.svg";
import inboxGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-inbox.svg";
import affiliateGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-affiliate.svg";
import vipGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-vip.svg";
import contactGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-contact.svg";
import downloadGrayIcon from "@/assets/t30/images/menuDrawer/gray/icon-download.svg";

import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetNavItemList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuthContext();

  const history = useHistory();

  const sideNavItemList: NavItem[] = useMemo(() => {
    const navItemList: NavItem[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.gameType === GameTypeEnum.NONE) continue;

      navItemList.push({
        key: gameTypeItem.key,
        label: gameTypeItem.text as string,
        iconUrl: gameTypeItem.iconUrl,
        navType: "action",
        gameType: gameTypeItem.gameType,
        callback: () => {
          handleChangeGameType(gameTypeItem.gameType);
          history.push(`/main/${gameTypeItem.key}`);
        },
      });
    }

    // navItemList.push({
    //   key: NavCardKey.VIP,
    //   label: "VIP",
    //   iconUrl: vipIcon,
    //   iconActiveUrl: vipIcon,
    //   navType: "action",
    //   callback: () => {
    //     history.push("/vip");
    //   },
    // });

    // navItemList.push({
    //   key: NavCardKey.PROMOTION,
    //   label: i18n.t("common.promotion"),
    //   iconUrl: promotionIcon,
    //   navType: "action",
    //   callback: () => {
    //     history.push("/promotion-list");
    //   },
    // });

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList]);

  const accountNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: accountIcon,
        iconSecondaryUrl: accountSecondaryIcon,
        iconGrayUrl: accountGrayIcon,
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        iconSecondaryUrl: depositSecondaryIcon,
        iconGrayUrl: depositGrayIcon,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        iconSecondaryUrl: withdrawSecondaryIcon,
        iconGrayUrl: withdrawGrayIcon,
        navType: "route",
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferIcon,
        iconSecondaryUrl: transferSecondaryIcon,
        iconGrayUrl: transferGrayIcon,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        iconSecondaryUrl: reportSecondaryIcon,
        iconGrayUrl: reportGrayIcon,
        navType: "route",
        routePath: "/report",
      },
      // {
      //   key: NavCardKey.MESSAGE_CENTER,
      //   label: i18n.t("inbox.title"),
      //   iconUrl: inboxIcon,
      //   iconSecondaryUrl: inboxSecondaryIcon,
      //   iconGrayUrl: inboxGrayIcon,
      //   navType: "route",
      //   routePath: "/message-center",
      // },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxIcon,
        iconSecondaryUrl: inboxSecondaryIcon,
        iconGrayUrl: inboxGrayIcon,
        navType: "route",
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateIcon,
        iconSecondaryUrl: affiliateSecondaryIcon,
        iconGrayUrl: affiliateGrayIcon,
        navType: "route",
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipIcon,
        iconSecondaryUrl: vipSecondaryIcon,
        iconGrayUrl: vipGrayIcon,
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactIcon,
        iconSecondaryUrl: contactSecondaryIcon,
        iconGrayUrl: contactGrayIcon,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadIcon,
        iconSecondaryUrl: downloadSecondaryIcon,
        iconGrayUrl: downloadGrayIcon,
        navType: "route",
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        label: i18n.t("wap.main.account.signout"),
        iconUrl: logoutIcon,
        iconSecondaryUrl: logoutIcon,
        iconGrayUrl: logoutIcon,
        navType: "action",
        callback: () => {
          handleLogout();
        },
      },
    ] as NavItem[];
  }, []);

  return {
    sideNavItemList,
    accountNavItemList,
  };
}
