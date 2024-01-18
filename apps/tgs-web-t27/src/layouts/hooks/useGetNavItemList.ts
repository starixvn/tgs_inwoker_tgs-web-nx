import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import affiliateImg from "@/assets/t19/images/account/navItem/icon-affiliate.svg";
import contactImg from "@/assets/t19/images/account/navItem/icon-contact.svg";
import vipImg from "@/assets/t19/images/account/navItem/icon-vip.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";
// update svg icon
import VipSvg from "@/pages/home/components/TabSvgIcon/Vip";
import AffiliateSvg from "@/pages/home/components/TabSvgIcon/Affiliate";
import ContactUsSvg from "@/pages/home/components/TabSvgIcon/ContactUs";
import HomeSvg from "@/pages/home/components/TabSvgIcon/Home";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AccountSvg from "@/pages/account/components/AccountSvgIcon/Account";
import DepositSvg from "@/pages/account/components/AccountSvgIcon/Deposit";
import WithdrawSvg from "@/pages/account/components/AccountSvgIcon/Withdraw";
import TransferSvg from "@/pages/account/components/AccountSvgIcon/Transfer";
import ReportSvg from "@/pages/account/components/AccountSvgIcon/Report";
import InboxSvg from "@/pages/account/components/AccountSvgIcon/Inbox";
import DownloadSvg from "@/pages/account/components/AccountSvgIcon/Download";
import LanguageSvg from "@/pages/account/components/AccountSvgIcon/Language";
import LogoutSvg from "@/pages/account/components/AccountSvgIcon/Logout";
import { Logout } from "@mui/icons-material";

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
  iconComponent?: React.FC<{ $color: string }>
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
  const { isDesktopSize } = useRwd();
  const { handleLogout } = useAuthContext();

  const sideNavItemList: (NavItem & { gameType: GameTypeEnum })[] | null = useMemo(() => {
    const navItemList: (NavItem & { gameType: GameTypeEnum })[] = [];

    if (isDesktopSize) {
      navItemList.push({
        key: NavCardKey.HOME,
        label: "Home",
        iconUrl: "",
        navType: "action",
        gameType: GameTypeEnum.NONE,
        router: "",
        callback: () => {
          history.push("/");
        },
        iconComponent: HomeSvg,
      });
    }

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
        iconComponent: gameTypeItem.iconComponent,
      });
    }

    navItemList.push({
      key: NavCardKey.VIP,
      label: "Vip",
      iconUrl: vipImg,
      navType: "action",
      gameType: GameTypeEnum.NONE,
      router: "",
      callback: () => {
        history.push("/vip");
      },
      iconComponent: VipSvg,
    });

    navItemList.push({
      key: NavCardKey.AFFILIATE,
      label: i18n.t("wap.main.account.affiliate"),
      iconUrl: affiliateImg,
      navType: "action",
      gameType: GameTypeEnum.NONE,
      router: "",
      callback: () => {
        history.push("/affiliate");
      },
      iconComponent: AffiliateSvg,
    });

    navItemList.push({
      key: NavCardKey.CONTACT_US,
      label: i18n.t("common.contact"),
      iconUrl: contactImg,
      navType: "action",
      gameType: GameTypeEnum.NONE,
      router: "",
      callback: () => {
        history.push("/support");
      },
      iconComponent: ContactUsSvg,
    });

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList, providerList]);

  const accountNavItemList: NavItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        label: i18n.t("wap.main.my"),
        navType: "route",
        routePath: "/profile",
        callback: () => {
          history.push("/profile");
        },
        iconComponent: AccountSvg,
      },
      {
        key: NavCardKey.DEPOSIT,
        label: i18n.t("common.deposit"),
        navType: "route",
        routePath: "/deposit",
        callback: () => {
          history.push("/deposit");
        },
        iconComponent: DepositSvg,
      },
      {
        key: NavCardKey.WITHDRAW,
        label: i18n.t("common.withdrawal"),
        navType: "route",
        routePath: "/withdrawal",
        callback: () => {
          history.push("/withdrawal");
        },
        iconComponent: WithdrawSvg,
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
        navType: "route",
        routePath: "/transfer",
        callback: () => {
          history.push("/withdrawal");
        },
        iconComponent: TransferSvg,
      },
      {
        key: NavCardKey.REPORT,
        label: i18n.t("report.title"),
        navType: "route",
        routePath: "/report",
        callback: () => {
          history.push("/withdrawal");
        },
        iconComponent: ReportSvg,
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        label: i18n.t("inbox.title"),
        navType: "route",
        routePath: "/message-center",
        callback: () => {
          history.push("/message-center");
        },
        iconComponent: InboxSvg,
      },
      {
        key: NavCardKey.INBOX,
        label: i18n.t("wap.main.account.inbox"),
        navType: "route",
        routePath: "/inbox",
        callback: () => {
          history.push("/inbox");
        },
        iconComponent: InboxSvg,
      },
      {
        key: NavCardKey.AFFILIATE,
        label: i18n.t("wap.main.account.affiliate"),
        navType: "route",
        routePath: "/affiliate",
        callback: () => {
          history.push("/affiliate");
        },
        iconComponent: AffiliateSvg,
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
        navType: "route",
        routePath: "/support",
        callback: () => {
          history.push("/support");
        },
        iconComponent: ContactUsSvg,
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        label: i18n.t("wap.main.account.appDownload"),
        navType: "route",
        routePath: "/appDownload",
        callback: () => {
          history.push("/appDownload");
        },
        iconComponent: DownloadSvg,
      },
      // {
      //   key: NavCardKey.LANGUAGE_SWITCH,
      //   label: i18n.t("common.language"),
      //   navType: "action",
      //   routePath: "",
      //   callback: () => {},
      //   iconComponent: LanguageSvg,
      // },
      {
        key: NavCardKey.LOGOUT,
        label: i18n.t("web.header.logout"),
        navType: "action",
        callback: () => {
          handleLogout();
        },
        iconComponent: LogoutSvg,
      },
    ] as NavItem[];
  }, []);

  return {
    sideNavItemList,
    accountNavItemList,
  };
}
