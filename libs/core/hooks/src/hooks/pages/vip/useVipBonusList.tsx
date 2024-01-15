import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";

export interface vipBonus {
  key: string;
  label: string;
}

export const useVipBonusList = () => {
  const vipBonusList: vipBonus[] = useMemo(() => {
    return [
      {
        key: "Promotion Conditions",
        label: i18n.t("vip.level"),
      },
      {
        key: "Quarterly Bet to Maintain",
        label: i18n.t("vip.levelKeepAccumulateBetAmount"),
      },
      {
        key: "Daily Bet to Level UP",
        label: i18n.t("vip.levelUpAccumulateBetAmount"),
      },
      {
        key: "Daily Deposit to Level UP",
        label: i18n.t("vip.levelUpAccumulateDeposit"),
      },
      {
        key: "Birthday Bonus",
        label: i18n.t("vip.birthBenefit"),
      },
      {
        key: "Level UP Bonus",
        label: i18n.t("vip.promotionBenefit"),
      },
      {
        key: "Quarterly Bonus",
        label: i18n.t("vip.quarterlyBenefit"),
      },
    ];
  }, []);
  return {
    vipBonusList,
  };
};
