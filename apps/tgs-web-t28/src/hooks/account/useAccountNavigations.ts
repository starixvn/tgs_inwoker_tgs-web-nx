import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import {
  ProfileIcon,
  AffiliateIcon,
  ContactIcon,
  DepositIcon,
  DownloadIcon,
  InoboxIcon,
  ReportIcon,
  TransferIcon,
  WithdrawIcon,
  VipIcon,
  LogourIcon,
} from "@/components/account/Icons";

export type NavItem = {
  key: NavCardKey;
  label: string | any;
  Icon: any;
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
  const { handleLogout } = useAuthContext();

  const navItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        navType: "route",
        label: i18n.t("wap.main.my"),
        Icon: ProfileIcon,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        navType: "route",
        label: i18n.t("common.deposit"),
        Icon: DepositIcon,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        navType: "route",
        label: i18n.t("common.withdrawal"),
        Icon: WithdrawIcon,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        navType: "route",
        label: i18n.t("common.transfer"),
        Icon: TransferIcon,
        routePath: "/transfer",
      },
      {
        key: NavCardKey.VIP,
        navType: "route",
        label: "VIP",
        Icon: VipIcon,
        routePath: "/vip",
      },
      {
        key: NavCardKey.REPORT,
        navType: "route",
        label: i18n.t("report.title"),
        Icon: ReportIcon,
        routePath: "/report",
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        navType: "route",
        label: i18n.t("wap.main.account.inbox"),
        Icon: InoboxIcon,
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        navType: "route",
        label: i18n.t("wap.main.account.affiliate"),
        Icon: AffiliateIcon,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        navType: "route",
        label: i18n.t("common.contact"),
        Icon: ContactIcon,
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        navType: "route",
        label: i18n.t("wap.main.account.appDownload"),
        Icon: DownloadIcon,
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        navType: "action",
        label: i18n.t("web.header.logout"),
        Icon: LogourIcon,
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
