export type TableKey = 'username' | 'memberType' | 'roundCount' | 'turnover' | 'winLoss' | 'special' | 'profit' | 'agentWinLoss' | 'agentSpecial' | 'agentProfit'

export const mapTable: Record<TableKey, string> = {
  username: "common.username",
  memberType: "agent.memberType",
  roundCount: "agent.totalOrders",
  turnover: "agent.validBet",
  winLoss: "agent.winLoss",
  special: "agent.special",
  profit: "agent.pL",
  agentWinLoss: "agent.agentWinLoss",
  agentSpecial: "agent.agentSpecial",
  agentProfit: "agent.agentPL",
};