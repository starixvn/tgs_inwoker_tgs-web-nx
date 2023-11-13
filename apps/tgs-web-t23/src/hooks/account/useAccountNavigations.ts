import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import profileImg from "@/assets/t23/images/account/navItem/icon-profile.svg";
import depositImg from "@/assets/t23/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t23/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t23/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t23/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t23/images/account/navItem/icon-inbox.svg";
import affiliateImg from "@/assets/t23/images/account/navItem/icon-affiliate.svg";
import downloadImg from "@/assets/t23/images/account/navItem/icon-download.svg";
import contactImg from "@/assets/t23/images/account/navItem/icon-contact.svg";

import profileSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-profile.svg";
import depositSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-deposit.svg";
import withdrawSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-withdrawal.svg";
import transferSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-transfer.svg";
import reportSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-report.svg";
import inboxSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-inbox.svg";
import affiliateSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-affiliate.svg";
import downloadSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-download.svg";
import contactSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-contact.svg";
import vipSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-vip.svg";
import logoutSecondaryImg from "@/assets/t23/images/account/navItem/mobile/icon-logout.svg";

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
}

export type NavItem = {
  key: NavCardKey;
  label: string | any;
  iconUrl: string;
  iconSecondaryUrl?: string;
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
        iconSecondaryUrl: profileSecondaryImg,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        navType: "route",
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        iconSecondaryUrl: depositSecondaryImg,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        navType: "route",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        iconSecondaryUrl: withdrawSecondaryImg,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        navType: "route",
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        iconSecondaryUrl: transferSecondaryImg,
        routePath: "/transfer",
      },
      {
        key: NavCardKey.VIP,
        navType: "route",
        label: "VIP",
        iconUrl: vipSecondaryImg,
        iconSecondaryUrl: vipSecondaryImg,
        routePath: "/vip",
      },
      {
        key: NavCardKey.REPORT,
        navType: "route",
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        iconSecondaryUrl: reportSecondaryImg,
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        navType: "route",
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        iconSecondaryUrl: inboxSecondaryImg,
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        navType: "route",
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        iconSecondaryUrl: affiliateSecondaryImg,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        navType: "route",
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        iconSecondaryUrl: contactSecondaryImg,
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        navType: "route",
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        iconSecondaryUrl: downloadSecondaryImg,
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        navType: "action",
        label: i18n.t("web.header.logout"),
        iconUrl: logoutSecondaryImg,
        iconSecondaryUrl: logoutSecondaryImg,
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
