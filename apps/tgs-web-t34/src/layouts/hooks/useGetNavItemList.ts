import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import accountIcon from "@/assets/t34/images/menuDrawer/icon-account.svg";
import depositIcon from "@/assets/t34/images/menuDrawer/icon-deposit.svg";
import withdrawIcon from "@/assets/t34/images/menuDrawer/icon-withdraw.svg";
import transferIcon from "@/assets/t34/images/menuDrawer/icon-transfer.svg";
import reportIcon from "@/assets/t34/images/menuDrawer/icon-report.svg";
import inboxIcon from "@/assets/t34/images/menuDrawer/icon-inbox.svg";
import affiliateIcon from "@/assets/t34/images/menuDrawer/icon-affiliate.svg";
import vipIcon from "@/assets/t34/images/menuDrawer/icon-vip.svg";
import contactIcon from "@/assets/t34/images/menuDrawer/icon-contact.svg";
import downloadIcon from "@/assets/t34/images/menuDrawer/icon-download.svg";
import accountActiveIcon from "@/assets/t34/images/menuDrawer/icon-account-active.svg";
import depositActiveIcon from "@/assets/t34/images/menuDrawer/icon-deposit-active.svg";
import withdrawActiveIcon from "@/assets/t34/images/menuDrawer/icon-withdraw-active.svg";
import transferActiveIcon from "@/assets/t34/images/menuDrawer/icon-transfer-active.svg";
import reportActiveIcon from "@/assets/t34/images/menuDrawer/icon-report-active.svg";
import inboxActiveIcon from "@/assets/t34/images/menuDrawer/icon-inbox-active.svg";
import affiliateActiveIcon from "@/assets/t34/images/menuDrawer/icon-affiliate-active.svg";
import vipActiveIcon from "@/assets/t34/images/menuDrawer/icon-vip-active.svg";
import contactActiveIcon from "@/assets/t34/images/menuDrawer/icon-contact-active.svg";
import downloadActiveIcon from "@/assets/t34/images/menuDrawer/icon-download-active.svg";
import logoutIcon from "@/assets/t34/images/menuDrawer/icon-logout-active.svg";

import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetNavItemList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuthContext();

  const history = useHistory();

  const gameTypeNavItemList: NavItem[] = useMemo(() => {
    const navItemList: NavItem[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.gameType === GameTypeEnum.NONE) continue;

      navItemList.push({
        key: gameTypeItem.key,
        label: gameTypeItem.text as string,
        iconUrl: gameTypeItem.iconUrl,
        iconSecondaryUrl: gameTypeItem.iconUrl,
        navType: "action",
        callback: () => {
          handleChangeGameType(gameTypeItem.gameType);

          if (history.location.pathname !== "/") {
            history.push("/");
          }
        },
      });
    }

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList]);

  const accountNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: accountIcon,
        iconActiveUrl: accountActiveIcon,
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        iconActiveUrl: depositActiveIcon,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        iconActiveUrl: withdrawActiveIcon,
        navType: "route",
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferIcon,
        iconActiveUrl: transferActiveIcon,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        iconActiveUrl: reportActiveIcon,
        navType: "route",
        routePath: "/report",
      },
      // {
      //   key: NavCardKey.MESSAGE_CENTER,
      //   label: i18n.t("inbox.title"),
      //   iconUrl: inboxIcon,
      //   iconActiveUrl: inboxActiveIcon,
      //   navType: "route",
      //   routePath: "/message-center",
      // },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxIcon,
        iconActiveUrl: inboxActiveIcon,
        navType: "route",
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateIcon,
        iconActiveUrl: affiliateActiveIcon,
        navType: "route",
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipIcon,
        iconActiveUrl: vipActiveIcon,
        navType: "route",
        routePath: "/profile_vip",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactIcon,
        iconActiveUrl: contactActiveIcon,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadIcon,
        iconActiveUrl: downloadActiveIcon,
        navType: "route",
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        label: i18n.t("wap.main.account.signout"),
        iconUrl: logoutIcon,
        iconActiveUrl: logoutIcon,
        navType: "action",
        callback: () => {
          handleLogout();
        },
      },
    ] as NavItem[];
  }, []);

  const headerNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.HOME,
        label: i18n.t("common.home"),
        iconUrl: "",
        navType: "route",
        routePath: "/",
      },
      {
        key: NavCardKey.PROMOTION,
        label: i18n.t("common.promotion"),
        iconUrl: "",
        navType: "route",
        routePath: "/promotion-list",
      },

      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: "",
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: "",
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: "",
        navType: "route",
        routePath: "/withdrawal",
      },
    ] as NavItem[];
  }, []);

  return {
    gameTypeNavItemList,
    accountNavItemList,
    headerNavItemList,
  };
}
