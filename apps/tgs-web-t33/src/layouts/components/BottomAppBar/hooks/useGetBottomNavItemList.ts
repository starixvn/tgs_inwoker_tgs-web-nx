import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { RouteCategoryEnum } from "@/router";
import { BottomNavItem, NavTypeEnum } from "@/layouts/components/BottomAppBar/BottomNav";
import iconPromo from "@/assets/t23/images/bottomNavBar/icon-promo.svg";
import iconHome from "@/assets/t23/images/bottomNavBar/icon-home.svg";
import iconProfile from "@/assets/t23/images/bottomNavBar/icon-profile.svg";
import iconDeposit from "@/assets/t23/images/bottomNavBar/icon-deposit.svg";
import iconWithdrawal from "@/assets/t23/images/bottomNavBar/icon-withdrawal.svg";
import { useRoute } from "@/hooks/useRoute";

export function useGetBottomNavItemList() {
  const location = useLocation();
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
        label: i18n.t("common.promotion"),
        iconUrl: iconPromo,
        iconActiveUrl: iconPromo,
        routePath: "/promotion-list",
        routeCategory: RouteCategoryEnum.PROMOTION,
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        label: i18n.t("common.deposit"),
        iconUrl: iconDeposit,
        iconActiveUrl: iconDeposit,
        routePath: "/deposit",
        routeCategory: RouteCategoryEnum.REFER,
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
