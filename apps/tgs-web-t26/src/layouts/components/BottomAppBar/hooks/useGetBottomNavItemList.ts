import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRoute } from "@tgs-web-nx/core/features";
import {
  HomeIcon,
  DepositIcon,
  WithdrawIcon,
  PromotionIcon,
  AccountIcon,
} from "../components/icons";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

type IconProps = {
  $color: string;
};

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  icon: React.FC<IconProps>;
  label: string;
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        icon: HomeIcon,
        handleClick: () => {
          history.push("/");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "deposit",
        label: i18n.t("common.deposit"),
        icon: DepositIcon,
        handleClick: () => {
          history.push("/deposit");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "withdrawal",
        label: i18n.t("common.withdrawal"),
        icon: WithdrawIcon,
        handleClick: () => {
          history.push("/withdrawal");
        },
      },

      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        icon: PromotionIcon,
        handleClick: () => {
          history.push("/promotion-list");
        },
      },

      {
        navType: NavTypeEnum.ITEM,
        key: "profile",
        label: i18n.t("deposit.details.account"),
        icon: AccountIcon,
        handleClick: () => {
          history.push("/account");
        },
      },
    ];
  }, []);
  const [selectedBottomNavItem, setSelectedBottomNavItem] = useState<BottomNavItem | null>(null);

  const handleClickBottomNavItem = (appBarItem: BottomNavItem) => {
    setSelectedBottomNavItem(appBarItem);
    appBarItem.handleClick();
  };
  const { route } = useRoute();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        return setSelectedBottomNavItem(bottomNavItemList[0]);
      case "/deposit":
        return setSelectedBottomNavItem(bottomNavItemList[1]);
      case "/withdrawal":
        return setSelectedBottomNavItem(bottomNavItemList[2]);
      case "/promotion-list":
        return setSelectedBottomNavItem(bottomNavItemList[3]);
      case "/account":
        return setSelectedBottomNavItem(bottomNavItemList[4]);
      default:
        return setSelectedBottomNavItem(bottomNavItemList[0]);
    }
  }, [route]);

  return {
    selectedBottomNavItem,
    bottomNavItemList,
    handleClickBottomNavItem,
  };
}
