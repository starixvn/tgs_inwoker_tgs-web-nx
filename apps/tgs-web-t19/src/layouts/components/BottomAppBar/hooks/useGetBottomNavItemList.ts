import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import giftIcon from "@/assets/t19/images/bottomAppBar/icon-gift.svg";
import depositIcon from "@/assets/t19/images/bottomAppBar/icon-deposit.svg";
import withdrawIcon from "@/assets/t19/images/bottomAppBar/icon-withdraw.svg";
import accountIcon from "@/assets/t19/images/bottomAppBar/icon-account.svg";
import homeIcon from "@/assets/t19/images/bottomAppBar/icon-home.svg";
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
        key: "account",
        label: i18n.t("deposit.details.account"),
        iconUrl: accountIcon,
        handleClick: () => {
          history.push("/account");
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
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: homeIcon,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "deposit",
        label: i18n.t("deposit.title"),
        iconUrl: depositIcon,
        handleClick: () => {
          history.push("/deposit");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "withdraw",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        handleClick: () => {
          history.push("/withdrawal");
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
