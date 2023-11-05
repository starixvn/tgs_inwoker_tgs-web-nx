import { useEffect, useMemo, useState } from "react";
import i18n from "@/utils/i18n";
import { RouteCategoryEnum } from "@/router";
import { BottomNavItem } from "@/components/layouts/BottomAppBar/BottomNav";
import { useRoute } from "@/core/hooks/tools/useRoute";
import { useLocation } from "react-router";
import iconPromo from "@/assets/t23/images/bottomNavBar/icon-promo.svg";
import iconHome from "@/assets/t23/images/bottomNavBar/icon-home.svg";
import iconProfile from "@/assets/t23/images/bottomNavBar/icon-profile.svg";
import iconDeposit from "@/assets/t23/images/bottomNavBar/icon-deposit.svg";
import iconWithdrawal from "@/assets/t23/images/bottomNavBar/icon-withdrawal.svg";
import { useHistory } from "react-router";

export function useGetBottomNavItemList() {
  const location = useLocation();
  const history = useHistory();

  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: "item",
        label: i18n.t("common.home"),
        iconUrl: iconHome,
        iconActiveUrl: iconHome,
        routePath: "/",
        routeCategory: RouteCategoryEnum.HOME,
      },

      {
        navType: "item",
        label: i18n.t("common.promotion"),
        iconUrl: iconPromo,
        iconActiveUrl: iconPromo,
        routePath: "/promotion-list",
        routeCategory: RouteCategoryEnum.PROMOTION,
      },
      {
        navType: "big-item",
        label: i18n.t("common.deposit"),
        iconUrl: iconDeposit,
        iconActiveUrl: iconDeposit,
        routePath: "/deposit",
        routeCategory: RouteCategoryEnum.REFER,
      },
      {
        navType: "item",
        label: i18n.t("common.withdrawal"),
        iconUrl: iconWithdrawal,
        iconActiveUrl: iconWithdrawal,
        routePath: "/withdrawal",
        routeCategory: RouteCategoryEnum.INBOX,
      },
      {
        navType: "item",
        label: i18n.t("web.account.profile"),
        iconUrl: iconProfile,
        iconActiveUrl: iconProfile,
        routePath: "/account",
        routeCategory: RouteCategoryEnum.MINE,
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
