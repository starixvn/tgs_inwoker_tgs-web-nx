type AgentInfo = {
  agentDividendPercentage: number;
  agentStatus: number;
  agentUsername: string;
  directPlayerWithAgentCount: number;
  realName: string;
  registeredOn: string;
};

export type AgentListInfoDto = {
  IsSuccess: boolean;
  code: number;
  data: {
    items: AgentInfo[];
    totalCount: number;
    errors: any[];
    message: string;
    valid: boolean;
  };
  info: string | null;
};
