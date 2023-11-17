import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey, NavItem } from "@/hooks/account/useAccountNavigations";
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

import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetNavItemList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuth();

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
        callback: () => {
          handleChangeGameType(gameTypeItem.gameType);

          if (history.location.pathname !== "/") {
            history.push("/");
          }
        },
      });
    }

    navItemList.push({
      key: NavCardKey.VIP,
      label: "VIP",
      iconUrl: vipIcon,
      iconActiveUrl: vipIcon,
      navType: "action",
      callback: () => {
        history.push("/vip");
      },
    });

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
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        navType: "route",
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferIcon,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxIcon,
        navType: "route",
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateIcon,
        navType: "route",
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipIcon,
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactIcon,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadIcon,
        navType: "route",
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        label: i18n.t("wap.main.account.signout"),
        iconUrl: logoutIcon,
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
