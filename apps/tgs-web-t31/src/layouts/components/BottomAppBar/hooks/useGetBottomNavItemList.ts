import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import iconPromo from "@/assets/t31/images/bottomNavBar/icon-promo.png";
import iconHome from "@/assets/t31/images/bottomNavBar/icon-home.png";
import iconProfile from "@/assets/t31/images/bottomNavBar/icon-profile.png";
import iconDeposit from "@/assets/t31/images/bottomNavBar/icon-deposit.png";
import iconWithdrawal from "@/assets/t31/images/bottomNavBar/icon-withdrawal.png";
import { useTransferDrawer } from "@/layouts/components/BottomAppBar/hooks/useTransferDrawer";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";

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
  routePath: string;
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
  const [selectedBottomNavItem, setSelectedBottomNavItem] = useState<BottomNavItem | null>(null);
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("deposit.details.account"),
        iconUrl: iconProfile,
        iconActiveUrl: iconProfile,
        routePath: "/account",
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.promotion"),
        iconUrl: iconPromo,
        iconActiveUrl: iconPromo,
        routePath: "/promotion-list",
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.home"),
        iconUrl: iconHome,
        iconActiveUrl: iconHome,
        routePath: "/",
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.deposit"),
        iconUrl: iconDeposit,
        iconActiveUrl: iconDeposit,
        routePath: "/deposit",
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.withdrawal"),
        iconUrl: iconWithdrawal,
        iconActiveUrl: iconWithdrawal,
        routePath: "/withdrawal",
      },
    ] as BottomNavItem[];
  }, []);

  // const { handleToggleMenu } = useHeader();
  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    switch (appBarItem.navType) {
      case NavTypeEnum.MENU:
        //todo:expand account menu
        break;
      case NavTypeEnum.ITEM:
        setSelectedBottomNavItem(appBarItem);
        history.push(appBarItem.routePath);
        break;

      default:
        appBarItem.handleClick();
        break;
    }
  };

  return {
    selectedBottomNavItem,
    bottomNavItemList,
    handleClickBottomNavItem,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
