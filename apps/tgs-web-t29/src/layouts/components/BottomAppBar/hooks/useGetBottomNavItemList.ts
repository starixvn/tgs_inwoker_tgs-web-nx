import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader } from "@tgs-web-nx/core/features";
import giftIcon from "@/assets/t29/images/bottomAppBar/icon-gift.svg";
import contactIcon from "@/assets/t29/images/bottomAppBar/icon-contact.svg";
import transferIcon from "@/assets/t29/images/bottomAppBar/icon-transfer.svg";
import reportIcon from "@/assets/t29/images/bottomAppBar/icon-report.svg";
import accountIcon from "@/assets/t29/images/bottomAppBar/icon-account.svg";

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
  handleClick: () => void;
};

export function useGetBottomNavItemList() {
  const history = useHistory();

  const bottomNavItemList = useMemo<BottomNavItem[]>(() => {
    return [
      {
        navType: NavTypeEnum.ITEM,
        key: "vip",
        label: "Vip",
        iconUrl: giftIcon,
        handleClick: () => {
          history.push("/vip");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "contact",
        label: i18n.t("common.contact"),
        iconUrl: contactIcon,
        handleClick: () => {
          history.push("/support");
        },
      },
      {
        navType: NavTypeEnum.BIG_ITEM,
        key: "vip",
        label: i18n.t("common.transfer"),
        iconUrl: transferIcon,
        handleClick: () => {
          console.log("OPEN");
          // history.push("/deposit");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "contact",
        label: i18n.t("report.title"),
        iconUrl: reportIcon,
        handleClick: () => {
          history.push("/report");
        },
      },
      {
        navType: NavTypeEnum.ITEM,
        key: "affiliate",
        label: i18n.t("deposit.details.account"),
        iconUrl: accountIcon,
        handleClick: () => {
          history.push("/account");
        },
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
        appBarItem.handleClick();
        break;
    }
  };

  return {
    bottomNavItemList,
    handleClickBottomNavItem,
  };
}
