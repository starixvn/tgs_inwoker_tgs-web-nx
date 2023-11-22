import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRoute } from "@tgs-web-nx/core/features";
import { RouteCategoryEnum } from "@/router";
import iconPromo from "@/assets/t34/images/bottomNavBar/icon-promotion.svg";
import iconHome from "@/assets/t34/images/bottomNavBar/icon-home.svg";
import iconDeposit from "@/assets/t34/images/bottomNavBar/icon-deposit.svg";
import iconWithdrawal from "@/assets/t34/images/bottomNavBar/icon-withdraw.svg";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  label: string;
  iconUrl: string;
  iconActiveUrl: string;
  routePath: string;
  routeCategory: RouteCategoryEnum;
};

export function useGetBottomNavItemList() {
  const history = useHistory();

  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.home"),
        iconUrl: iconHome,
        iconActiveUrl: iconHome,
        routePath: "/",
        routeCategory: RouteCategoryEnum.HOME,
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.deposit"),
        iconUrl: iconDeposit,
        iconActiveUrl: iconDeposit,
        routePath: "/deposit",
        routeCategory: RouteCategoryEnum.REFER,
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.withdrawal"),
        iconUrl: iconWithdrawal,
        iconActiveUrl: iconWithdrawal,
        routePath: "/withdrawal",
        routeCategory: RouteCategoryEnum.INBOX,
      },
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("common.promotion"),
        iconUrl: iconPromo,
        iconActiveUrl: iconPromo,
        routePath: "/promotion-list",
        routeCategory: RouteCategoryEnum.PROMOTION,
      },
    ] as BottomNavItem[];
  }, []);

  const [selectedBottomNavItem, setSelectedBottomNavItem] = useState<BottomNavItem | null>(null);
  const { route } = useRoute();

  useEffect(() => {
    const matchNavItem = null;

    if (!matchNavItem) {
      return;
    }

    setSelectedBottomNavItem(matchNavItem);
  }, [route]);

  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    setSelectedBottomNavItem(appBarItem);
    history.push(appBarItem.routePath);
  };

  return {
    bottomNavItemList,
    selectedBottomNavItem,
    handleClickBottomNavItem,
  };
}
