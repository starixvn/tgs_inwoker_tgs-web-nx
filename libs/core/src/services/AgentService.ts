import { WinLossReportDto, AgentInfotDto } from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";

export type WinLostConfig = {
  username: string;
  from: string;
  to: string;
  downline?: boolean;
  page?: number;
  rows?: number;
  memberType?: string;
};

export function WinLostReport({
  username,
  from,
  to,
  downline = false,
  page = 1,
  rows = 20,
  memberType = "agent",
}: WinLostConfig) {
  const apiUrl = `AgentWinLossReport/agentWinLoss?username=${username}&from=${from}T16:00:00.000Z&to=${to}T16:00:00.000Z&downline=${downline}&page=${page}&rows=${rows}&memberType=${memberType}`;

  const getWinLossReport = () => {
    return ApiService.get(apiUrl) as unknown as Promise<WinLossReportDto>;
  };

  const queryKey = ["getWinLossReport"];

  return { getWinLossReport, queryKey };
}

export function AgentInfo() {
  const GetAgentInfo = async () => {
    return ApiService.get("agent/info") as unknown as Promise<AgentInfotDto>;
  };

  const queryKey = ["getAgentInfo"];

  return { GetAgentInfo, queryKey };
}
