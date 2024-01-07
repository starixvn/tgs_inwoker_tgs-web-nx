import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import depositIcon from "@/assets/t27/images/bottomAppBar/icon-deposit.svg";
import casinoIcon from "@/assets/t27/images/bottomAppBar/icon-liveCasino.svg";
import sportsIcon from "@/assets/t27/images/bottomAppBar/icon-sports.svg";
import accountIcon from "@/assets/t27/images/bottomAppBar/icon-account.svg";
import promotionIcon from "@/assets/t27/images/bottomAppBar/icon-promotion.svg";
import LiveCasinoSvg from "@/assets/t27/images/bottomAppBar/LiveCasino";

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
        iconComponent: LiveCasinoSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "liveCasino",
        label: i18n.t("common.live"),
        iconUrl: casinoIcon,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.LIVELOBBY);
          // history.push("/main/sports");
        },
        iconComponent: LiveCasinoSvg,
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        key: "deposit",
        label: i18n.t("deposit.title"),
        iconUrl: depositIcon,
        handleClick: () => {
          // handleChangeGameType(GameTypeEnum.NONE);
          history.push("/deposit");
        },
        iconComponent: LiveCasinoSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "sports",
        label: i18n.t("common.sports"),
        iconUrl: sportsIcon,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.SPORTS);
          // history.push("/main/sports");
        },
        iconComponent: LiveCasinoSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: promotionIcon,
        handleClick: () => {
          history.push("/promotion-list");
        },
        iconComponent: LiveCasinoSvg,
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
