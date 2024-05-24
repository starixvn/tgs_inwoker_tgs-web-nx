type AgentInfo = {
  cardGamePercentage: number;
  directAgentCount: number;
  directPlayerCount: number;
  dividendPercentage: number;
  indirectAgentCount: number;
  indirectPlayerCount: number;
  invitationCode: string;
  liveDealerPercentage: number;
  lotteryPercentage: number;
  negativeAgentDividend: number;
  negativeAgentDividendCarryForward: boolean;
  platformChargePercentage: number;
  slotPercentage: number;
  sportsPercentage: number;
  virtualSportsPercentage: number;
};

export type AgentInfotDto = {
  IsSuccess: boolean;
  code: number;
  data: AgentInfo;
  info: string | null;
};
