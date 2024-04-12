import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";

import HomeSvg from "@/assets/t36/images/bottomAppBar/Home";
import WithdrawSvg from "@/assets/t36/images/bottomAppBar/Withdraw";
import DepositSvg from "@/assets/t36/images/bottomAppBar/Deposit";
import PromotionSvg from "@/assets/t36/images/bottomAppBar/Promotion";
import AccountSvg from "@/assets/t36/images/bottomAppBar/Account";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  label: string | any;
  routePath: string;
  gameType: GameTypeEnum;
  handleClick: () => void;
  iconComponent?: React.FC<{ $color: string }>;
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const location = useLocation();
  const { handleChangeGameType } = useHomeGameContext();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        routePath: "/",
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/");
        },
        iconComponent: HomeSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "deposit",
        label: i18n.t("deposit.title"),
        routePath: "/deposit",
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          // handleChangeGameType(GameTypeEnum.NONE);
          history.push("/deposit");
        },
        iconComponent: DepositSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "withdraw",
        label: i18n.t("common.withdrawal"),
        routePath: "/withdrawal",
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          // handleChangeGameType(GameTypeEnum.NONE);
          history.push("/withdrawal");
        },
        iconComponent: WithdrawSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        routePath: "/promotion-list",
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          // handleChangeGameType(GameTypeEnum.NONE);
          history.push("/promotion-list");
        },
        iconComponent: PromotionSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "account",
        label: i18n.t("deposit.details.account"),
        routePath: "/account",
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          // handleChangeGameType(GameTypeEnum.NONE);
          history.push("/account");
        },
        iconComponent: AccountSvg,
      },
    ];
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
  };

  return {
    bottomNavItemList,
    selectedBottomNavItem,
    handleClickBottomNavItem,
  };
}
