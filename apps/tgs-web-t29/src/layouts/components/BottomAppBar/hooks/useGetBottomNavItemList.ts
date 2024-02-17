import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import giftIcon from "@/assets/t29/images/bottomAppBar/icon-gift.png";
import transferIcon from "@/assets/t29/images/bottomAppBar/icon-transfer.svg";
import reportIcon from "@/assets/t29/images/bottomAppBar/icon-report.svg";
import accountIcon from "@/assets/t29/images/bottomAppBar/icon-account.svg";
import homeIcon from "@/assets/t29/images/bottomAppBar/icon-home.svg";
import { useTransferDrawer } from "@/layouts/components/BottomAppBar/hooks/useTransferDrawer";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  label: string | any;
  iconUrl: string;
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: homeIcon,
        handleClick: () => {
          goToHomePage();
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: giftIcon,
        handleClick: () => {
          history.push("/promotion-list");
        },
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        key: "vip",
        label: i18n.t("common.bank"),
        iconUrl: transferIcon,
        handleClick: () => {
          handleTransferDrawerToggle();
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "contact",
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        handleClick: () => {
          history.push("/report");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "affiliate",
        label: i18n.t("deposit.details.account"),
        iconUrl: accountIcon,
        handleClick: () => {
          history.push("/account");
        },
      },
    ];
  }, []);

  // const { handleToggleMenu } = useHeader();
  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    switch (appBarItem.navType) {
      // case NavTypeEnum.MENU :
      //   handleToggleMenu(true);
      //
      //   break;

      default:
        appBarItem.handleClick();
        break;
    }
  };

  return {
    bottomNavItemList,
    handleClickBottomNavItem,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
