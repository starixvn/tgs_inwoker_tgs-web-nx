import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { useAccountStore } from "@tgs-web-nx/core";
import agentImg from "@/assets/t29/images/account/navItem/icon-agent.svg";
import profileImg from "@/assets/t29/images/account/navItem/icon-profile.svg";
import depositImg from "@/assets/t29/images/account/navItem/icon-deposit.svg";
import withdrawImg from "@/assets/t29/images/account/navItem/icon-withdraw.svg";
import transferImg from "@/assets/t29/images/account/navItem/icon-transfer.svg";
import reportImg from "@/assets/t29/images/account/navItem/icon-report.svg";
import inboxImg from "@/assets/t29/images/account/navItem/icon-inbox.svg";
import downloadImg from "@/assets/t29/images/account/navItem/icon-download.svg";
import languageImg from "@/assets/t29/images/account/navItem/icon-language.svg";
import contactImg from "@/assets/t29/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t29/images/account/navItem/icon-vip.svg";
import wageringImg from "@/assets/t29/images/account/navItem/icon-wagering.svg";
import agentWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-agent.svg";
import profileWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-profile.svg";
import depositWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-deposit.svg";
import withdrawWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-withdraw.svg";
import transferWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-transfer.svg";
import reportWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-report.svg";
import inboxWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-inbox.svg";
import downloadWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-download.svg";
import contactWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-contact.svg";
import vipWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-vip.svg";
import wageringWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-wagering.svg";
import languageWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-wagering.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import rewardImg from "@/assets/t29/images/account/navItem/icon-reward.svg";
import rewardWhiteImg from "@/assets/t29/images/account/navItemWhite/icon-reward.svg";

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
  const gameTypeList = useGameTypeList();
  const { account } = useAccountStore();
  const { handleChangeGameType, providerList } = useHomeGameContext();
  const history = useHistory();
  const isAgent = account.info.playerisagentid !== null;

  const sideNavItemList: (NavItem & { gameType: GameTypeEnum })[] | null = useMemo(() => {
    const navItemList: (NavItem & { gameType: GameTypeEnum })[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.gameType === GameTypeEnum.NONE) continue;

      if (providerList.length) {
        const hasData = providerList.filter((provider) => {
          //因虛擬體育是歸類在體育底下,體育分類有無資料的判斷要加上虛擬體育
          if (gameTypeItem.gameType === GameTypeEnum.SPORTS) {
            return (
              provider.gametypes.includes(GameTypeEnum.SPORTS) ||
              provider.gametypes.includes(GameTypeEnum.RNGSPORTS)
            );
          }
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

    if (config.features.HaveVIPFeature && brandConfig[mapBrandName(config.brand)].isShowVIP) {
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
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        iconUrl: profileImg,
        iconSecondaryUrl: profileWhiteImg,
        navType: "route",
        routePath: "/profile",
      },
      isAgent && {
        key: NavCardKey.AGENT,
        label: i18n.t("usertype.agent"),
        iconUrl: agentImg,
        iconSecondaryUrl: agentWhiteImg,
        navType: "route",
        routePath: "/agent",
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        iconSecondaryUrl: depositWhiteImg,
        navType: "route",
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        iconSecondaryUrl: withdrawWhiteImg,
        navType: "route",
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.WAGERING,
        label: i18n.t("t29.wagering"),
        iconUrl: wageringImg,
        iconSecondaryUrl: wageringWhiteImg,
        navType: "route",
        routePath: "/wagering",
      },
      {
        key: NavCardKey.REWARD,
        label: i18n.t("common.reward"),
        iconUrl: rewardImg,
        iconSecondaryUrl: rewardWhiteImg,
        navType: "route",
        routePath: "/reward",
      },
      {
        key: NavCardKey.TRANSFER,
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        iconSecondaryUrl: transferWhiteImg,
        navType: "route",
        routePath: "/transfer",
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        iconSecondaryUrl: reportWhiteImg,
        navType: "route",
        routePath: "/report",
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        iconSecondaryUrl: inboxWhiteImg,
        navType: "route",
        routePath: "/inbox",
      },
      config.features.HaveVIPFeature &&
        brandConfig[mapBrandName(config.brand)].isShowVIP && {
          key: NavCardKey.VIP,
          label: "VIP",
          iconUrl: vipImg,
          iconSecondaryUrl: vipWhiteImg,
          navType: "route",
          routePath: "/vip",
        },
      {
        key: NavCardKey.CONTACT_US,
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        iconSecondaryUrl: contactWhiteImg,
        navType: "route",
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        iconSecondaryUrl: downloadWhiteImg,
        navType: "route",
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LANGUAGE_SWITCH,
        label: i18n.t("common.language"),
        iconUrl: languageImg,
        iconSecondaryUrl: languageWhiteImg,
        navType: "action",
        routePath: null,
        callback: () => {},
      },
    ].filter(Boolean) as NavItem[];

    return navItems;
  }, []);

  return {
    sideNavItemList,
    accountNavItemList,
  };
}
