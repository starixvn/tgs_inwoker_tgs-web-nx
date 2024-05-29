import { i18n } from "@tgs-web-nx/utils";

export type TableKey = 'username' | 'memberType' | 'roundCount' | 'turnover' | 'winLoss' | 'special' | 'profit' | 'agentWinLoss' | 'agentSpecial' | 'agentProfit'

export const mapTable: Record<TableKey, string> = {
  username: i18n.t("common.username"),
  memberType: "类型",
  roundCount: "訂單數",
  turnover: "有效投注",
  winLoss: i18n.t("report.winloss"),
  special: "特別",
  profit: "盈虧",
  agentWinLoss: i18n.t("report.winloss"),
  agentSpecial: "代理特别",
  agentProfit: "代理盈虧",
};