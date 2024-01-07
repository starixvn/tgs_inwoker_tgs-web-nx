import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import LiveCasinoSvg from "@/assets/t27/images/bottomAppBar/LiveCasino";
import SportSvg from "@/assets/t27/images/bottomAppBar/Sport";
import AccountSvg from "@/assets/t27/images/bottomAppBar/Account";
import DepositSvg from "@/assets/t27/images/bottomAppBar/Deposit";
import PromotionSvg from "@/assets/t27/images/bottomAppBar/Promotion";
import { useTransferDrawer } from "@/layouts/components/BottomAppBar/hooks/useTransferDrawer";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  key: string;
  label: string | any;
  gameType: GameTypeEnum;
  handleClick: () => void;
  iconComponent?: React.FC<{ $color: string }>
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
  const { handleChangeGameType } = useHomeGameContext();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "account",
        label: i18n.t("deposit.details.account"),
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/account");
        },
        iconComponent: AccountSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "liveCasino",
        label: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.LIVELOBBY);
          history.push("/main/liveCasino");
        },
        iconComponent: LiveCasinoSvg,
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        key: "deposit",
        label: i18n.t("deposit.title"),
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/deposit");
        },
        iconComponent: DepositSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "sports",
        label: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.SPORTS);
          history.push("/main/sports");
        },
        iconComponent: SportSvg,
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "promotion",
        label: i18n.t("common.promotion"),
        gameType: GameTypeEnum.NONE,
        handleClick: () => {
          handleChangeGameType(GameTypeEnum.NONE);
          history.push("/promotion-list");
        },
        iconComponent: PromotionSvg,
      },
    ];
  }, []);

  return {
    bottomNavItemList,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
