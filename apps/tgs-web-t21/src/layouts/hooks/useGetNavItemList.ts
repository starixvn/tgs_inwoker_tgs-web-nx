import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { NavCardKey } from "@tgs-web-nx/types";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router";
import { useGoToHomePage } from "@/hooks/home/useGoToHomePage";
import homeImg from "@/assets/t21/images/account/navItem/icon-home.svg";
import profileImg from "@/assets/t21/images/account/navItem/icon-account.svg";
import depositImg from "@/assets/t21/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t21/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t21/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t21/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t21/images/account/navItem/icon-inbox.svg";
import languageImg from "@/assets/t21/images/account/navItem/icon-language.svg";
import contactImg from "@/assets/t21/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t21/images/account/navItem/icon-vip.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";

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
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType, providerList, isCustomizedBrand } = useHomeGameContext();
  const history = useHistory();

  const sideNavItemList: (NavItem & { gameType: GameTypeEnum })[] | null = useMemo(() => {
    const navItemList: (NavItem & { gameType: GameTypeEnum })[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.gameType === GameTypeEnum.NONE) continue;

      if (providerList.length) {
        const hasData = providerList.filter((provider) => {
          return provider.gametypes.includes(gameTypeItem.gameType);
        });
        if (hasData.length === 0) continue;
      }

      navItemList.push({
        key: gameTypeItem.key,
        label: gameTypeItem.text as string,
        iconUrl: gameTypeItem.iconUrl,
        navType: "action",
        gameType: gameTypeItem.gameType,
        router: gameTypeItem.key as string,
        callback: () => {
          handleChangeGameType(gameTypeItem.gameType);
          history.push(`/main/${gameTypeItem.key}`);
        },
      });
    }

    if (!isCustomizedBrand) {
      navItemList.push({
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipImg,
        iconActiveUrl: vipImg,
        navType: "action",
        gameType: GameTypeEnum.NONE,
        router: "vip",
        callback: () => {
          history.push("/vip");
        },
      });
    }

    navItemList.push({
      key: NavCardKey.PROMOTION,
      label: i18n.t("common.promotion"),
      iconUrl: "",
      navType: "action",
      gameType: GameTypeEnum.NONE,
      router: "promotion-list",
      callback: () => {
        history.push("/promotion-list");
      },
    });

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList, providerList]);
  const accountNavItemList: NavItem[] = useMemo(() => {
    const navItems = [
      {
        key: NavCardKey.HOME,
        label: i18n.t("common.home"),
        iconUrl: homeImg,
        navType: "action",
        callback: () => {
          goToHomePage();
        },
      },
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
      {
        key: NavCardKey.MESSAGE_CENTER,
        label: i18n.t("inbox.title"),
        iconUrl: inboxImg,
        navType: "route",
        routePath: "/message-center",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        navType: "route",
        routePath: "/inbox",
      },
      // {
      //   key: NavCardKey.AFFILIATE,
      //   label: i18n.t("wap.main.account.affiliate"),
      //   iconUrl: affiliateImg,
      //   iconSecondaryUrl: affiliateWhiteImg,
      //   navType: "route",
      //   routePath: "/affiliate",
      // },
      {
        key: NavCardKey.VIP,
        label: "VIP",
        iconUrl: vipImg,
        navType: "route",
        routePath: "/vip",
      },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        navType: "route",
        routePath: "/support",
      },
      // {
      //   key: NavCardKey.APP_DOWNLOAD,
      //   label: i18n.t("wap.main.account.appDownload"),
      //   iconUrl: downloadImg,
      //   navType: "route",
      //   routePath: "/appDownload",
      // },
      {
        key: NavCardKey.LANGUAGE_SWITCH,
        label: i18n.t("common.language"),
        iconUrl: languageImg,
        navType: "action",
        routePath: null,
        callback: () => {},
      },
    ] as NavItem[];

    return navItems;
  }, []);

  return {
    sideNavItemList,
    accountNavItemList,
  };
}
