import { useMemo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useGameStore } from "@tgs-web-nx/core";

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
        index: ReportTabIndexEnum.WITHDRAW,
        label: i18n.t("report.withdrawalDetails"),
      },
      {
        index: ReportTabIndexEnum.DEPOSIT,
        label: i18n.t("report.depositDetails"),
      },
      (() => {
        if (game.containTransferWallet) {
          return {
            index: ReportTabIndexEnum.TRANSFER,
            label: i18n.t("common.transfer"),
          };
        }
      })(),
      {
        index: ReportTabIndexEnum.BALANCE_CHANGE,
        label: i18n.t("balancechangereport"),
      },
      {
        index: ReportTabIndexEnum.JOIN_PROMOTION,
        label: i18n.t("report.joinedPromo.title"),
      },
    ].filter((reportTab) => !!reportTab) as ReportTab[];
  }, [game.containTransferWallet]);

  return {
    displayedTabList,
  };
}
