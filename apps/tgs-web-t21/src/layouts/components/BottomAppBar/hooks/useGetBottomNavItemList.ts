import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useGoToHomePage } from "@/hooks/home/useGoToHomePage";
import promotionIcon from "@/assets/t21/images/bottomAppBar/icon-promotion.svg";
import sportIcon from "@/assets/t21/images/bottomAppBar/icon_sport.svg";
import chatIcon from "@/assets/t21/images/bottomAppBar/icon-chat.svg";
import accountIcon from "@/assets/t21/images/bottomAppBar/icon-account.svg";
import homeIcon from "@/assets/t21/images/bottomAppBar/icon-home.svg";

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
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: homeIcon,
        handleClick: () => {
          goToHomePage();
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: promotionIcon,
        handleClick: () => {
          history.push("/promotion-list");
        },
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        key: "sports",
        label: i18n.t("common.sports"),
        iconUrl: sportIcon,
        handleClick: () => {
          history.push("/sports");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "contact",
        label: i18n.t("common.cs"),
        iconUrl: chatIcon,
        handleClick: () => {
          history.push("/support");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "account",
        label: i18n.t("deposit.details.account"),
        iconUrl: accountIcon,
        handleClick: () => {
          history.push("/account");
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
  };
}
