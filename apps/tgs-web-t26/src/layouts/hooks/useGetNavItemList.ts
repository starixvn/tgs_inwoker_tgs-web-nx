import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import profileImg from "@/assets/t26/images/account/navItem/icon-profile.svg";
import depositImg from "@/assets/t26/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t26/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t26/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t26/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t26/images/account/navItem/icon-inbox.svg";
import affiliateImg from "@/assets/t26/images/account/navItem/icon-affiliate.svg";
import downloadImg from "@/assets/t26/images/account/navItem/icon-download.svg";
import languageImg from "@/assets/t26/images/account/navItem/icon-language.svg";
import contactImg from "@/assets/t26/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t26/images/account/navItem/icon-vip.svg";
import wageringImg from "@/assets/t26/images/account/navItem/icon-wagering.svg";

import profileWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-profile.svg";
import depositWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-deposit.svg";
import withdrawWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-withdraw.svg";
import transferWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-transfer.svg";
import reportWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-report.svg";
import inboxWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-inbox.svg";
import affiliateWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-affiliate.svg";
import downloadWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-download.svg";
import contactWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-contact.svg";
import vipWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-vip.svg";
import wageringWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-wagering.svg";
import languageWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-wagering.svg";

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
} from "@/layouts/components/Header/components/ContextMenuButton/components/Icons";

import useGameTypeList from "@/hooks/home/useGameTypeList";
type IconProps = {
  $color: string;
};
export type NavItem = {
  key: NavCardKey | string;
  label: string;
  Icon: React.FC<IconProps> | null;
  // iconUrl?: string;
  // iconActiveUrl?: string;
  // iconSecondaryUrl?: string;
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
        // iconUrl: gameTypeItem.iconUrl,
        Icon: gameTypeItem.Icon,
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
      Icon: null,
      // iconUrl: vipImg,
      // iconActiveUrl: vipImg,
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
      Icon: null,
      // iconUrl: "",
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
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        Icon: ProfileIcon,
        navType: "route",
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        Icon: DepositIcon,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        Icon: WithdrawIcon,
        navType: "route",
        routePath: "/withdrawal",
      },
      // {
      //   key: NavCardKey.WAGERING,
      //   label: i18n.t("t29.wagering"),
      //   iconUrl: wageringImg,
      //   iconSecondaryUrl: wageringWhiteImg,
      //   navType: "route",
      //   routePath: "/wagering",
      // },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        Icon: TransferIcon,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        Icon: ReportIcon,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        label: i18n.t("inbox.title"),
        Icon: InoboxIcon,
        navType: "route",
        routePath: "/message-center",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        Icon: InoboxIcon,
        navType: "route",
        routePath: "/inbox",
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        Icon: AffiliateIcon,
        navType: "route",
        routePath: "/affiliate",
      },
      // {
      //   key: NavCardKey.VIP,
      //   label: "VIP",
      //   iconUrl: vipImg,
      //   iconSecondaryUrl: vipWhiteImg,
      //   navType: "route",
      //   routePath: "/vip",
      // },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        Icon: ContactIcon,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        Icon: DownloadIcon,
        navType: "route",
        routePath: "/appDownload",
      },
      // {
      //   key: NavCardKey.LANGUAGE_SWITCH,
      //   label: i18n.t("common.language"),
      //   iconUrl: languageImg,
      //   iconSecondaryUrl: languageWhiteImg,
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
