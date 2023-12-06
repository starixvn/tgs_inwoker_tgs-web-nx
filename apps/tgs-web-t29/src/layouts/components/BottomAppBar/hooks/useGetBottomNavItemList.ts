import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import giftIcon from "@/assets/t29/images/bottomAppBar/icon-gift.svg";
import contactIcon from "@/assets/t29/images/bottomAppBar/icon-contact.svg";
import transferIcon from "@/assets/t29/images/bottomAppBar/icon-transfer.svg";
import reportIcon from "@/assets/t29/images/bottomAppBar/icon-report.svg";
import accountIcon from "@/assets/t29/images/bottomAppBar/icon-account.svg";
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
  const { handleChangeGameType } = useHomeGameContext();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: contactIcon,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/");
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
