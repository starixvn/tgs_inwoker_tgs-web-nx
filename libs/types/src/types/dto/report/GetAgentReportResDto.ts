export interface AgentReportDetail {
  from: string;
  maxActivePlayerNumber: number;
  rebate: number;
  sentOn: string;
  settleDateTime: string;
  to: string;
  validBet: number;
}

export interface AgentReportResponse {
  items: AgentReportDetail[];
  total: {
    rebate: number;
    validBet: number;
  };
  totalCount: number;
}

export interface GetAgentReportResDto {
  IsSuccess: boolean;
  code: number;
  data: AgentReportResponse;
  info: string | null;
}
