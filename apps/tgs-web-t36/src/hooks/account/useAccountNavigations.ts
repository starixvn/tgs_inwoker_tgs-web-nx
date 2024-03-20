import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";


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

// export function useAccountNavigations() {
//   const { handleLogout } = useAuthContext();

//   const navItemList: NavItem[] = useMemo(() => {
//     return [
//       {
//         key: NavCardKey.PROFILE,
//         navType: "route",
//         label: i18n.t("wap.main.my"),
//         iconUrl: profileImg,
//         iconSecondaryUrl: profileSecondaryImg,
//         routePath: "/profile",
//       },
//       {
//         key: NavCardKey.DEPOSIT,
//         navType: "route",
//         label: i18n.t("common.deposit"),
//         iconUrl: depositImg,
//         iconSecondaryUrl: depositSecondaryImg,
//         routePath: "/deposit",
//       },
//       {
//         key: NavCardKey.WITHDRAW,
//         navType: "route",
//         label: i18n.t("common.withdrawal"),
//         iconUrl: withdrawImg,
//         iconSecondaryUrl: withdrawSecondaryImg,
//         routePath: "/withdrawal",
//       },
//       {
//         key: NavCardKey.TRANSFER,
//         navType: "route",
//         label: i18n.t("common.transfer"),
//         iconUrl: transferImg,
//         iconSecondaryUrl: transferSecondaryImg,
//         routePath: "/transfer",
//       },
//       {
//         key: NavCardKey.VIP,
//         navType: "route",
//         label: "VIP",
//         iconUrl: vipImg,
//         iconSecondaryUrl: vipSecondaryImg,
//         routePath: "/vip",
//       },
//       {
//         key: NavCardKey.REPORT,
//         navType: "route",
//         label: i18n.t("report.title"),
//         iconUrl: reportImg,
//         iconSecondaryUrl: reportSecondaryImg,
//         routePath: "/report",
//       },
//       {
//         key: NavCardKey.MESSAGE_CENTER,
//         navType: "route",
//         label: i18n.t("wap.main.account.inbox"),
//         iconUrl: inboxImg,
//         iconSecondaryUrl: inboxSecondaryImg,
//         routePath: "/inbox",
//       },
//       {
//         key: NavCardKey.AFFILIATE,
//         navType: "route",
//         label: i18n.t("wap.main.account.affiliate"),
//         iconUrl: affiliateImg,
//         iconSecondaryUrl: affiliateSecondaryImg,
//         routePath: "/affiliate",
//       },
//       {
//         key: NavCardKey.CONTACT_US,
//         navType: "route",
//         label: i18n.t("common.contact"),
//         iconUrl: contactImg,
//         iconSecondaryUrl: contactSecondaryImg,
//         routePath: "/support",
//       },
//       {
//         key: NavCardKey.APP_DOWNLOAD,
//         navType: "route",
//         label: i18n.t("wap.main.account.appDownload"),
//         iconUrl: downloadImg,
//         iconSecondaryUrl: downloadSecondaryImg,
//         routePath: "/appDownload",
//       },
//       {
//         key: NavCardKey.LOGOUT,
//         navType: "action",
//         label: i18n.t("web.header.logout"),
//         iconUrl: logoutImg,
//         iconSecondaryUrl: logoutSecondaryImg,
//         callback: () => {
//           handleLogout();
//         },
//       },
//     ];
//   }, []);
//   const navItemDictionary = useMemo(() => {
//     const dictionary: { [key in string]: NavItem } = {};
//     navItemList.forEach((navItem) => {
//       dictionary[navItem.key] = navItem;
//     });

//     return dictionary;
//   }, []);

//   return {
//     navItemList,
//     navItemDictionary,
//   };
// }
