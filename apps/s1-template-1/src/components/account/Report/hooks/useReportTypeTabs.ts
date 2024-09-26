import { useGameStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { useMemo } from "react";

export enum ReportTabIndexEnum {
  "PLATFORM" = 1,
  "BETTING" = 2,
  "WITHDRAW" = 3,
  "DEPOSIT" = 4,
  "REBATE" = 5,
  "TRANSFER" = 6,
  "JOIN_PROMOTION" = 7,
  "BALANCE_CHANGE" = 8,
}
export interface ReportTab {
  index: ReportTabIndexEnum;
  label: string;
}

export function useReportTypeTabs() {
  const { game } = useGameStore();

  const displayedTabList = useMemo<ReportTab[]>(() => {
    return [
      {
        index: ReportTabIndexEnum.BETTING,
        label: i18n.t("report.bettingDetails"),
      },
      {
        index: ReportTabIndexEnum.DEPOSIT,
        label: i18n.t("report.depositDetails"),
      },
      {
        index: ReportTabIndexEnum.WITHDRAW,
        label: i18n.t("report.withdrawalDetails"),
      },
     
      // (() => {
      //   if (game.containTransferWallet) {
      //     return {
      //       index: ReportTabIndexEnum.TRANSFER,
      //       label: i18n.t("common.transfer"),
      //     };
      //   }
      // })(),
      // {
      //   index: ReportTabIndexEnum.BALANCE_CHANGE,
      //   label: i18n.t("report.balanceChanges.title"),
      // },
      // {
      //   index: ReportTabIndexEnum.JOIN_PROMOTION,
      //   label: i18n.t("report.joinedPromo.title"),
      // },
    ].filter((reportTab) => !!reportTab) as ReportTab[];
  }, [game.containTransferWallet]);

  return {
    displayedTabList,
  };
}
