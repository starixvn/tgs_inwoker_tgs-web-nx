import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { AppHistory } from "@tgs-web-nx/core";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import { BottomNavItem } from "@/layouts/components/BottomAppBar/BottomNav";

export enum RouteCategoryEnum {
  HOME,
  REFER,
  PROMOTION,
  INBOX,
  MINE,
}

export function useGetBottomNavItemList() {
  const location = useLocation();
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo(() => {
    return [
      {
        navType: "item",
        label: i18n.t("common.home"),
        iconUrl: `${import.meta.env.PUBLIC_URL || ""}/assets/images/bottomAppBar/icon_home.svg`,
        iconActiveUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_home_active.svg`,
        routePath: "/",
        routeCategory: RouteCategoryEnum.HOME,
      },
      {
        navType: "item",
        label: i18n.t("affiliate.title"),
        iconUrl: `${import.meta.env.PUBLIC_URL || ""}/assets/images/bottomAppBar/icon_refer.svg`,
        iconActiveUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_refer_active.svg`,
        routePath: "/affiliate",
        routeCategory: RouteCategoryEnum.REFER,
      },
      {
        navType: "item",
        label: i18n.t("common.promotion"),
        iconUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_promotion.svg`,
        iconActiveUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_promotion_active.svg`,
        routePath: "/promotion-list",
        routeCategory: RouteCategoryEnum.PROMOTION,
      },
      {
        navType: "item",
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: `${import.meta.env.PUBLIC_URL || ""}/assets/images/bottomAppBar/icon_email.svg`,
        iconActiveUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_email_active.svg`,
        routePath: "/inbox",
        routeCategory: RouteCategoryEnum.INBOX,
      },
      {
        navType: "item",
        label: i18n.t("web.account.profile"),
        iconUrl: `${import.meta.env.PUBLIC_URL || ""}/assets/images/bottomAppBar/icon_mine.svg`,
        iconActiveUrl: `${
          import.meta.env.PUBLIC_URL || ""
        }/assets/images/bottomAppBar/icon_mine_active.svg`,
        routePath: "/account",
        routeCategory: RouteCategoryEnum.MINE,
      },
    ] as BottomNavItem[];
  }, []);

  const [selectedBottomNavItem, setSelectedBottomNavItem] = useState<BottomNavItem | null>(null);

  useEffect(() => {
    const matchNavItem =
      bottomNavItemList.find((bottomNavItem) => {
        return bottomNavItem.routePath === location.pathname;
      }) || null;

    if (!matchNavItem) {
      return;
    }

    setSelectedBottomNavItem(matchNavItem);
  }, [location.pathname]);

  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    setSelectedBottomNavItem(appBarItem);

    if (appBarItem.routeCategory === RouteCategoryEnum.HOME) {
      goToHomePage();
      return;
    }

    AppHistory.push(appBarItem.routePath);
  };

  return {
    bottomNavItemList,
    selectedBottomNavItem,
    handleClickBottomNavItem,
  };
}
