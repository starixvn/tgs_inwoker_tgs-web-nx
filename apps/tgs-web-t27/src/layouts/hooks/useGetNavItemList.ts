import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import profileImg from "@/assets/t19/images/account/navItem/icon-profile.svg";
import depositImg from "@/assets/t19/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t19/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t19/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t19/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t19/images/account/navItem/icon-inbox.svg";
import affiliateImg from "@/assets/t19/images/account/navItem/icon-affiliate.svg";
import downloadImg from "@/assets/t19/images/account/navItem/icon-download.svg";
import languageImg from "@/assets/t19/images/account/navItem/icon-language.svg";
import contactImg from "@/assets/t19/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t19/images/account/navItem/icon-vip.svg";
import wageringImg from "@/assets/t19/images/account/navItem/icon-wagering.svg";
import profileWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-profile.svg";
import depositWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-deposit.svg";
import withdrawWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-withdraw.svg";
import transferWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-transfer.svg";
import reportWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-report.svg";
import inboxWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-inbox.svg";
import affiliateWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-affiliate.svg";
import downloadWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-download.svg";
import contactWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-contact.svg";
import vipWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-vip.svg";
import wageringWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-wagering.svg";
import languageWhiteImg from "@/assets/t19/images/account/navItemWhite/icon-wagering.svg";
// desktop left menu active icon
import vipActiveImg from "@/assets/t19/images/account/navItemActive/icon-vip.svg";
import profileActiveImg from "@/assets/t19/images/account/navItemActive/icon-profile.svg";
import depositActiveImg from "@/assets/t19/images/account/navItemActive/icon-deposit.svg";
import withdrawActiveImg from "@/assets/t19/images/account/navItemActive/icon-withdraw.svg";
import transferActiveActiveImg from "@/assets/t19/images/account/navItemActive/icon-transfer.svg";
import reportActiveImg from "@/assets/t19/images/account/navItemActive/icon-report.svg";
import inboxActiveImg from "@/assets/t19/images/account/navItemActive/icon-inbox.svg";
import affiliateActiveImg from "@/assets/t19/images/account/navItemActive/icon-affiliate.svg";
import downloadActiveImg from "@/assets/t19/images/account/navItemActive/icon-download.svg";
import logoutActiveImg from "@/assets/t19/images/account/navItemActive/icon-logout.svg";
import contactActiveImg from "@/assets/t19/images/account/navItemActive/icon-contact.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";

export type NavItem = {
  key: NavCardKey | string;
  label: string | any;
  iconUrl: string;
  iconActiveUrl?: string;
  iconSecondaryUrl?: string;
  iconPrimaryUrl?: string;
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
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const { providerList } = useHomeGameContext();
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

  // iconUrl for mobile account page use
  // iconSecondaryUrl for desktop account menu use
  const accountNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        iconSecondaryUrl: profileWhiteImg,
        iconPrimaryUrl: profileActiveImg,
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        iconSecondaryUrl: depositWhiteImg,
        iconPrimaryUrl: depositActiveImg,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        iconSecondaryUrl: withdrawWhiteImg,
        iconPrimaryUrl: withdrawActiveImg,
        navType: "route",
        routePath: "/withdrawal",
      },
      // {
      //   key: NavCardKey.WAGERING,
      //   //todo: 新增 Wagering t18 翻譯
      //   label: "Wagering",
      //   iconUrl: wageringImg,
      //   iconSecondaryUrl: wageringWhiteImg,
      //   iconPrimaryUrl: wageringActiveImg,
      //   navType: "route",
      //   routePath: "/wagering",
      // },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        iconSecondaryUrl: transferWhiteImg,
        iconPrimaryUrl: transferActiveActiveImg,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        iconSecondaryUrl: reportWhiteImg,
        iconPrimaryUrl: reportActiveImg,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        label: i18n.t("inbox.title"),
        iconUrl: inboxImg,
        iconSecondaryUrl: inboxWhiteImg,
        iconPrimaryUrl: inboxActiveImg,
        navType: "route",
        routePath: "/message-center",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        iconSecondaryUrl: inboxWhiteImg,
        iconPrimaryUrl: inboxActiveImg,
        navType: "route",
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        iconSecondaryUrl: affiliateWhiteImg,
        iconPrimaryUrl: affiliateActiveImg,
        navType: "route",
        routePath: "/affiliate",
      },
      // {
      //   key: NavCardKey.VIP,
      //   label: "VIP",
      //   iconUrl: vipImg,
      //   iconSecondaryUrl: vipWhiteImg,
      //   iconPrimaryUrl: vipActiveImg,
      //   navType: "route",
      //   routePath: "/vip",
      // },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        iconSecondaryUrl: contactWhiteImg,
        iconPrimaryUrl: contactActiveImg,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        iconSecondaryUrl: downloadWhiteImg,
        iconPrimaryUrl: downloadActiveImg,
        navType: "route",
        routePath: "/appDownload",
      },
      // {
      //   key: NavCardKey.LANGUAGE_SWITCH,
      //   label: i18n.t("common.language"),
      //   iconUrl: languageImg,
      //   iconSecondaryUrl: languageWhiteImg,
      //   iconPrimaryUrl: languageWhiteImg,
      //   navType: "action",
      //   routePath: null,
      //   callback: () => {},
      // },
    ] as NavItem[];
  }, []);

  return {
    sideNavItemList,
    accountNavItemList,
  };
}
