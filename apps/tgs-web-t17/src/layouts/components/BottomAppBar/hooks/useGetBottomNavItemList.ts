import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import HomeSvg from "@/assets/t17/images/bottomAppBar/Home";
import AccountSvg from "@/assets/t17/images/bottomAppBar/Account";
import DepositSvg from "@/assets/t17/images/bottomAppBar/Deposit";
import WithdrawSvg from "@/assets/t17/images/bottomAppBar/Withdraw";
import PromotionSvg from "@/assets/t17/images/bottomAppBar/Promotion";
import { useTransferDrawer } from "@/layouts/components/BottomAppBar/hooks/useTransferDrawer";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  label: string | any;
  handleClick: () => void;
  iconComponent?: React.FC<{ $color: string }>
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
  const { handleChangeGameType } = useHomeGameContext();
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "home",
        label: i18n.t("common.home"),
        handleClick: () => {
          goToHomePage();
        },
        iconComponent: HomeSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "deposit",
        label: i18n.t("common.deposit"),
        handleClick: () => {
          history.push("/deposit");
        },
        iconComponent: DepositSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "withdraw",
        label: i18n.t("common.withdrawal"),
        handleClick: () => {
          history.push("withdrawal");
        },
        iconComponent: WithdrawSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        handleClick: () => {
          history.push("/promotion-list");
        },
        iconComponent: PromotionSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "account",
        label: i18n.t("deposit.details.account"),
        handleClick: () => {
          history.push("/account");
        },
        iconComponent: AccountSvg,
      },
    ];
  }, []);

  return {
    bottomNavItemList,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
