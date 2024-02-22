import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";
import homeIcon from "@/assets/t25/images/bottomAppBar/icon-home.svg";
import gameIcon from "@/assets/t25/images/bottomAppBar/icon-game.svg";
import promotionIcon from "@/assets/t25/images/bottomAppBar/icon-promotion.svg";
import depositIcon from "@/assets/t25/images/bottomAppBar/icon-deposit.svg";
import withdrawIcon from "@/assets/t25/images/bottomAppBar/icon-withdraw.svg";
import homeActiveIcon from "@/assets/t25/images/bottomAppBar/icon-home-active.svg";
import gameActiveIcon from "@/assets/t25/images/bottomAppBar/icon-game-active.svg";
import promotionActiveIcon from "@/assets/t25/images/bottomAppBar/icon-promotion-active.svg";
import depositActiveIcon from "@/assets/t25/images/bottomAppBar/icon-deposit-active.svg";
import withdrawActiveIcon from "@/assets/t25/images/bottomAppBar/icon-withdraw-active.svg";
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
  iconActiveUrl: string;
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
  const goToHomePage = useGoToHomePage();
  const { handleChangeGameType } = useHomeGameContext();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: homeIcon,
        iconActiveUrl: homeActiveIcon,
        handleClick: () => {
          goToHomePage();
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "game",
        label: "Game",
        iconUrl: gameIcon,
        iconActiveUrl: gameActiveIcon,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.SPORTS)
          history.push(`/main/sports`);
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: promotionIcon,
        iconActiveUrl: promotionActiveIcon,
        handleClick: () => {
          history.push("/promotion-list");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "deposit",
        label: i18n.t("report.title"),
        iconUrl: depositIcon,
        iconActiveUrl: depositActiveIcon,
        handleClick: () => {
          history.push("/deposit");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "profile",
        label: i18n.t("deposit.details.account"),
        iconUrl: withdrawIcon,
        iconActiveUrl: withdrawActiveIcon,
        handleClick: () => {
          history.push("/profile");
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
