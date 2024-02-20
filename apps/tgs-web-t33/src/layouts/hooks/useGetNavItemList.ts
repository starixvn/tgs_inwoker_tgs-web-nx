import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import accountIcon from "@/assets/t33/images/menuDrawer/icon-account.svg";
import promotionIcon from "@/assets/t33/images/menuDrawer/icon-promotion.svg";
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
import accountIconDark from "@/assets/t33/images/menuDrawer/dark/icon-account-dark.svg";
import depositIconDark from "@/assets/t33/images/menuDrawer/dark/icon-deposit-dark.svg";
import withdrawIconDark from "@/assets/t33/images/menuDrawer/dark/icon-withdraw-dark.svg";
import transferIconDark from "@/assets/t33/images/menuDrawer/dark/icon-transfer-dark.svg";
import reportIconDark from "@/assets/t33/images/menuDrawer/dark/icon-report-dark.svg";
import inboxIconDark from "@/assets/t33/images/menuDrawer/dark/icon-inbox-dark.svg";
import affiliateIconDark from "@/assets/t33/images/menuDrawer/dark/icon-affiliate-dark.svg";
import vipIconDark from "@/assets/t33/images/menuDrawer/dark/icon-vip-dark.svg";
import contactIconDark from "@/assets/t33/images/menuDrawer/dark/icon-contact-dark.svg";
import downloadIconDark from "@/assets/t33/images/menuDrawer/dark/icon-download-dark.svg";
import logoutIconDark from "@/assets/t33/images/menuDrawer/dark/icon-logout-dark.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export function useGetNavItemList() {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { handleLogout } = useAuthContext();

  const history = useHistory();

  const sideNavItemList: (NavItem & { gameType: GameTypeEnum })[] = useMemo(() => {
    const navItemList: (NavItem & { gameType: GameTypeEnum })[] = [];

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
      iconActiveUrl: vipIconDark,
      navType: "action",
      gameType: GameTypeEnum.NONE,
      callback: () => {
        history.push("/vip");
      },
    });

    navItemList.push({
      key: NavCardKey.PROMOTION,
      label: i18n.t("common.promotion"),
      iconUrl: promotionIcon,
      navType: "action",
      gameType: GameTypeEnum.NONE,
      callback: () => {
        history.push("/promotion-list");
      },
    });

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList]);

  const accountNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: accountIcon,
        iconActiveUrl: accountIconDark,
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        iconActiveUrl: depositIconDark,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        iconActiveUrl: withdrawIconDark,
        navType: "route",
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferIcon,
        iconActiveUrl: transferIconDark,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        iconActiveUrl: reportIconDark,
        navType: "route",
        routePath: "/report",
      },
      // {
      //   key: NavCardKey.MESSAGE_CENTER,
      //   label: i18n.t("wap.main.account.inbox"),
      //   iconUrl: inboxIcon,
      //   iconActiveUrl: inboxIconDark,
      //   navType: "route",
      //   routePath: "/message-center",
      // },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateIcon,
        iconActiveUrl: affiliateIconDark,
        navType: "route",
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipIcon,
        iconActiveUrl: vipIconDark,
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactIcon,
        iconActiveUrl: contactIconDark,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadIcon,
        iconActiveUrl: downloadIconDark,
        navType: "route",
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        label: i18n.t("wap.main.account.signout"),
        iconUrl: logoutIcon,
        iconActiveUrl: logoutIconDark,
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
