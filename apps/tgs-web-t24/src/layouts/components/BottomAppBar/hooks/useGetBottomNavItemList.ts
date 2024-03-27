import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader } from "@tgs-web-nx/core/features";
import iconMenu from "@/assets/t24/images/bottomNavBar/icon-menu.svg";
import iconPromotion from "@/assets/t24/images/bottomNavBar/icon-promotion.svg";
import iconVip from "@/assets/t24/images/bottomNavBar/icon-vip.svg";
import iconContact from "@/assets/t24/images/bottomNavBar/icon-chat.svg";
import iconAffiliate from "@/assets/t24/images/bottomNavBar/icon-affiliate.svg";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  label: any;
  iconUrl: string;
  routePath: string;
};

export function useGetBottomNavItemList() {
  const history = useHistory();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "menu",
        label: "Menu",
        iconUrl: iconMenu,
        routePath: "/",
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: iconPromotion,
        routePath: "/promotion-list",
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "vip",
        label: "VIP",
        iconUrl: iconVip,
        routePath: "/vip",
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "contact",
        label: i18n.t("common.contact"),
        iconUrl: iconContact,
        routePath: "/support",
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "affiliate",
        label: i18n.t("web.account.affiliate"),
        iconUrl: iconAffiliate,
        routePath: "/affiliate",
      },
    ];
  }, []);

  const { handleToggleMenu } = useHeader();

  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    switch (appBarItem.key) {
      case "menu":
        handleToggleMenu(true);

        break;

      default:
        history.push(appBarItem.routePath);
        break;
    }
  };

  return {
    bottomNavItemList,
    handleClickBottomNavItem,
  };
}
