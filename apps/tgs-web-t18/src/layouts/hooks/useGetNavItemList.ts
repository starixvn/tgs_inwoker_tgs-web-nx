import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { NavCardKey } from "@tgs-web-nx/types";
import { useGoToHomePage } from "@/hooks/home/useGoToHomePage";
import profileImg from "@/assets/t18/images/account/navItem/icon_profile.svg";
import depositImg from "@/assets/t18/images/account/navItem/icon_deposit.svg";
import withdrawImg from "@/assets/t18/images/account/navItem/icon_withdraw.svg";
import transferImg from "@/assets/t18/images/account/navItem/icon_transfer.svg";
import reportImg from "@/assets/t18/images/account/navItem/icon_report.svg";
import inboxImg from "@/assets/t18/images/account/navItem/icon_inbox.svg";
import affiliateImg from "@/assets/t18/images/account/navItem/icon_affiliate.svg";
import downloadImg from "@/assets/t18/images/account/navItem/icon_download.png";

export type NavItem = {
  key: NavCardKey | string;
  label: string | any;
  iconUrl: string;
  iconActiveUrl?: string;
  iconSecondaryUrl?: string;
  isHide?: boolean;
  router?: string;
  routePath?: string;
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

export function useGetNavItemList() {
  const goToHomePage = useGoToHomePage();

  const accountNavItemList: NavItem[] = useMemo(() => {
    const navItems = [
      // {
      //   key: NavCardKey.HOME,
      //   label: i18n.t("common.home"),
      //   iconUrl: homeImg,
      //   navType: "action",
      //   callback: () => {
      //     goToHomePage();
      //   },
      // },
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        navType: "route",
        routePath: "/profile",
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
      // {
      //   key: NavCardKey.WAGERING,
      //   label: i18n.t("t29.wagering"),
      //   iconUrl: wageringImg,
      //   navType: "route",
      //   routePath: "/wagering",
      // },
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
      // {
      //   key: NavCardKey.MESSAGE_CENTER,
      //   label: i18n.t("inbox.title"),
      //   iconUrl: inboxImg,
      //   navType: "route",
      //   routePath: "/message-center",
      // },
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
      // {
      //   key: NavCardKey.VIP,
      //   label: "VIP",
      //   iconUrl: vipImg,
      //   navType: "route",
      //   routePath: "/vip",
      // },
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
      // {
      //   key: NavCardKey.LANGUAGE_SWITCH,
      //   label: i18n.t("common.language"),
      //   iconUrl: languageImg,
      //   navType: "action",
      //   routePath: null,
      //   callback: () => {},
      // },
    ] as NavItem[];

    return navItems;
  }, []);

  return {
    accountNavItemList,
  };
}
