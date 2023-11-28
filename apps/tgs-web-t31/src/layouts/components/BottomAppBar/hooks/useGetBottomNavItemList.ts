import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import iconPromo from "@/assets/t31/images/bottomNavBar/icon-promo.png";
import iconHome from "@/assets/t31/images/bottomNavBar/icon-home.png";
import iconProfile from "@/assets/t31/images/bottomNavBar/icon-profile.png";
import iconDeposit from "@/assets/t31/images/bottomNavBar/icon-deposit.png";
import iconWithdrawal from "@/assets/t31/images/bottomNavBar/icon-withdrawal.png";
import { useRoute } from "@/hooks/useRoute";

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
};

export function useGetBottomNavItemList() {
  const location = useLocation();
  const history = useHistory();

  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        label: i18n.t("web.account.profile"),
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

  const [selectedBottomNavItem, setSelectedBottomNavItem] = useState<BottomNavItem | null>(null);
  const { route } = useRoute();

  useEffect(() => {
    const matchNavItem =
      bottomNavItemList.find((bottomNavItem) => {
        return bottomNavItem.routeCategory === route?.category;
      }) || null;

    if (!matchNavItem) {
      console.log(location.pathname);
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
