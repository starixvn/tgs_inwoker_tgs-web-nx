import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";

export interface vipBonusV2 {
  key: string;
  label: string;
}

export const useVipBonusListV2 = () => {
  const vipBonusList: vipBonusV2[] = useMemo(() => {
    return [
      {
        key: "VIP",
        label: "VIP",
      },
      {
        key: "Level Up Bonus",
        label: i18n.t("vip.levelUpBonus"),
      },
      {
        key: "Birthday Bonus",
        label: i18n.t("vip.birthBenefit"),
      },
      {
        key: "Quarterly Bonus",
        label: i18n.t("vip.quarterlyBenefit"),
      },
      {
        key: "Total Deposit",
        label: i18n.t("vip.totalDeposit"),
      },
      {
        key: "Total Valid Bet",
        label: i18n.t("vip.totalVaildBet"),
      },
    ];
  }, []);
  return {
    vipBonusList,
  };
};
