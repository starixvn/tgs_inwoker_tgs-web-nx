import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import accountIcon from "@/assets/t22/images/bottomAppBar/account.svg";
import accountActiveIcon from "@/assets/t22/images/bottomAppBar/accountActive.svg";
import depositIcon from "@/assets/t22/images/bottomAppBar/deposit.svg";
import depositActiveIcon from "@/assets/t22/images/bottomAppBar/depositActive.svg";
import homeIcon from "@/assets/t22/images/bottomAppBar/home.svg";
import homeActiveIcon from "@/assets/t22/images/bottomAppBar/homeActive.svg";
import promotionIcon from "@/assets/t22/images/bottomAppBar/promotion.svg";
import promotionActiveIcon from "@/assets/t22/images/bottomAppBar/promotionActive.svg";
import withdrawalIcon from "@/assets/t22/images/bottomAppBar/withdrawal.svg";
import withdrawalActiveIcon from "@/assets/t22/images/bottomAppBar/withdrawalActive.svg";


export type BottomNavItem = {
  key: string;
  label: string | any;
  path: string;
  iconUrl: string;
  activeIconUrl: string;
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();
  const goToHomePage = useGoToHomePage();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        key: "home",
        label: i18n.t("common.home"),
        iconUrl: homeIcon,
        activeIconUrl: homeActiveIcon,
        path: "/",
        handleClick: () => goToHomePage(),
      },
      {
        key: "account",
        label: i18n.t("deposit.details.account"),
        iconUrl: accountIcon,
        activeIconUrl: accountActiveIcon,
        path: "/account",
        handleClick: () => history.push("/account"),
      },
      {
        key: "promotion",
        label: i18n.t("common.promotion"),
        iconUrl: promotionIcon,
        activeIconUrl: promotionActiveIcon,
        path: "/promotion-list",
        handleClick: () => history.push("/promotion-list"),
      },
      {
        key: "deposit",
        label: i18n.t("common.deposit"),
        iconUrl: depositIcon,
        activeIconUrl: depositActiveIcon,
        handleClick: () => history.push("/deposit"),
        path: "/deposit",
      },
      {
        key: "withdrawal",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawalIcon,
        activeIconUrl: withdrawalActiveIcon,
        handleClick: () => history.push("/withdrawal"),
        path: "/withdrawal",
      },
    ];
  }, []);

  return {
    bottomNavItemList,
  };
}
