import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import profileImg from "@/assets/t34/images/account/navItem/icon-account.svg";
import depositImg from "@/assets/t34/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t34/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t34/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t34/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t34/images/account/navItem/icon-inbox.svg";
import affiliateImg from "@/assets/t34/images/account/navItem/icon-affiliate.svg";
import downloadImg from "@/assets/t34/images/account/navItem/icon-download.svg";
import contactImg from "@/assets/t34/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t34/images/account/navItem/icon-vip.svg";
import logoutImg from "@/assets/t34/images/account/navItem/icon-logout.svg";

export enum NavCardKey {
  PROFILE,
  DEPOSIT,
  WITHDRAW,
  TRANSFER,
  REPORT,
  INBOX,
  AFFILIATE,
  CONTACT_US,
  APP_DOWNLOAD,
  VIP,
  LOGOUT,
  PROMOTION,
  HOME,
}

export type NavItem = {
  key: NavCardKey;
  label: string | any;
  iconUrl: string;
  iconSecondaryUrl?: string;
  iconActiveUrl?: string;
  isHide?: boolean;
} & (
  | {
      navType: "route";
      routePath: string;
    }
  | {
      navType: "action";
      callback: () => void;
    }
);

export function useAccountNavigations() {
  const { handleLogout } = useAuth();

  const navItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        navType: "route",
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        navType: "route",
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        navType: "route",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        navType: "route",
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        routePath: "/transfer",
      },
      {
        key: NavCardKey.VIP,
        navType: "route",
        label: "VIP",
        iconUrl: vipImg,
        routePath: "/vip",
      },
      {
        key: NavCardKey.REPORT,
        navType: "route",
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        navType: "route",
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        navType: "route",
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        navType: "route",
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        navType: "route",
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        navType: "action",
        label: i18n.t("web.header.logout"),
        iconUrl: logoutImg,
        callback: () => {
          handleLogout();
        },
      },
    ];
  }, []);

  const navItemDictionary = useMemo(() => {
    const dictionary: { [key in string]: NavItem } = {};
    navItemList.forEach((navItem) => {
      dictionary[navItem.key] = navItem;
    });

    return dictionary;
  }, []);

  return {
    navItemList,
    navItemDictionary,
  };
}
