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
        label: "Level Up Bonus",
      },
      {
        key: "Birthday Bonus",
        label: "Birthday Bonus",
      },
      {
        key: "Quarterly Bonus",
        label: "Quarterly Bonus",
      },
      {
        key: "Total Deposit",
        label: "Total Deposit",
      },
      {
        key: "Total Valid Bet",
        label: "Total Valid Bet",
      },
    ];
  }, []);
  return {
    vipBonusList,
  };
};
