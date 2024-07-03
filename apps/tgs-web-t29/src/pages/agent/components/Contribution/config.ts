import { i18n } from "@tgs-web-nx/utils";

export type TableKey = 'username' | 'type' | 'depositAmount' | 'withdrawalAmount' |  'agentAdjustAmount' | 'bonusAdjustAmount' | 'bonusAmount' | 'betAmount' | 'validBetAmount' | 'turnover' | 'winLossAmount' | 'netProfit'

export const mapTable: Record<TableKey, string> = {
  "username": i18n.t("common.username"),
  "type": i18n.t("agent.memberType"),
  "depositAmount": i18n.t("common.deposit"),
  "withdrawalAmount": i18n.t("common.withdrawal"),
  "bonusAmount": i18n.t("agent.bonus"),
  "bonusAdjustAmount": i18n.t("agent.bonusAdjust"),
  "agentAdjustAmount": i18n.t("agent.agentAdjust"),
  "betAmount": i18n.t("report.betAmount"),
  "validBetAmount": i18n.t("agent.validBet"),
  "turnover": i18n.t("report.turnover"),
  "winLossAmount": i18n.t("agent.winLoss"),
  "netProfit": i18n.t("agent.netProfit"),
};

