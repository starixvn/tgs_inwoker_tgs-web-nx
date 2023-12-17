import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import depositIcon from "@/assets/t32/images/account/navItemWhite/icon-deposit.svg";
import withdrawIcon from "@/assets/t32/images/account/navItemWhite/icon-withdraw.svg";
import promotionIcon from "@/assets/t32/images/account/navItemWhite/icon-promotion.svg";
import homeIcon from "@/assets/t32/images/account/navItemWhite/icon-home.svg";
import { useTransferDrawer } from "@/layouts/components/BottomAppBar/hooks/useTransferDrawer";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";

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
  const { isTransferDrawerOpen, handleTransferDrawerToggle } = useTransferDrawer();
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
        key: "deposit",
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        handleClick: () => {
          history.push("/deposit");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "withdraw",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawIcon,
        handleClick: () => {
          history.push("/withdrawal");
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
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  };
}
