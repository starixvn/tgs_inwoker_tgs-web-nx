import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";

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
      !brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].isHideVIPBirthdayBonus && {
        key: "Birthday Bonus",
        label: i18n.t("vip.birthBenefit"),
      },
      !brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].isHideVIPQuarterlyBonus && {
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
    ].filter(Boolean) as vipBonusV2[];
  }, []);
  return {
    vipBonusList,
  };
};
