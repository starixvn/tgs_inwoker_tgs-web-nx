import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHomeGameContext } from "@tgs-web-nx/core/features";
import { NavCardKey, NavItem } from "@/hooks/account/useAccountNavigations";
import accountIcon from "@/assets/t33/images/menuDrawer/icon-account.svg";
import depositIcon from "@/assets/t33/images/menuDrawer/icon-deposit.svg";
import withdrawIcon from "@/assets/t33/images/menuDrawer/icon-withdraw.svg";
import transferIcon from "@/assets/t33/images/menuDrawer/icon-transfer.svg";
import reportIcon from "@/assets/t33/images/menuDrawer/icon-report.svg";
import inboxIcon from "@/assets/t33/images/menuDrawer/icon-inbox.svg";
import affiliateIcon from "@/assets/t33/images/menuDrawer/icon-affiliate.svg";
import vipIcon from "@/assets/t33/images/menuDrawer/icon-vip.svg";
import contactIcon from "@/assets/t33/images/menuDrawer/icon-contact.svg";
import downloadIcon from "@/assets/t33/images/menuDrawer/icon-download.svg";
import logoutIcon from "@/assets/t33/images/menuDrawer/icon-logout.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetNavItemList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuth();

  const history = useHistory();

  const gameTypeNavItemList: NavItem[] = useMemo(() => {
    return gameTypeList.map((gameTypeItem) => {
      return {
        key: gameTypeItem.key,
        label: gameTypeItem.text as string,
        iconUrl: gameTypeItem.iconUrl,
        iconSecondaryUrl: gameTypeItem.iconUrl,
        navType: "action",
        callback: () => {
          history.push("/");
          handleChangeGameType(gameTypeItem.gameType);
        },
      };
    }) as NavItem[];
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
    gameTypeNavItemList,
    accountNavItemList,
  };
}
