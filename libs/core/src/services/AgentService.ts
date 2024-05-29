import {
  AgentInfotDto,
  AgentListInfoDto,
  PlayerInfoDto,
  ProfitShareDto,
  WinLossReportDto,
  WinLostBreadcrumbDto,
} from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";

type BreadcrumbConfig = {
  username: string;
  memberType?: string;
};

export type WinLostConfig = {
  from: string;
  to: string;
  downline: boolean;
  page?: number;
  rows?: number;
} & BreadcrumbConfig;

export type UserConfig = {
  username?: string;
  status?: string | null;
  page?: number;
  pageSize?: number;
  rows?: number;
};

const getReport = ({
  username,
  from,
  to,
  downline,
  page = 1,
  rows = 20,
  memberType = "agent",
}: WinLostConfig) => {
  const apiUrl = `AgentWinLossReport/agentWinLoss?username=${username}&from=${from}T16:00:00.000Z&to=${to}T16:00:00.000Z&downline=${downline}&page=${page}&rows=${rows}&memberType=${memberType}`;

  return ApiService.get(apiUrl) as unknown as Promise<WinLossReportDto>;
};

const getBreadcrumb = ({ username, memberType = "agent" }: BreadcrumbConfig) => {
  const apiUrl = `AgentWinLossReport/breadcrumb?&username=${username}&memberType=${memberType}`;
  return ApiService.get(apiUrl) as unknown as Promise<WinLostBreadcrumbDto>;
};

export const WinLostReport = {
  getReport,
  getBreadcrumb,
};

export const ProfitShare = {
  getProfitShare: () =>
    ApiService.get("AgentDividendReport/beforehand") as unknown as Promise<ProfitShareDto>,
};

export const AgentInfo = {
  getAgentInfo: async () => {
    return ApiService.get("agent/info") as unknown as Promise<AgentInfotDto>;
  },
};

export const PlayerList = {
  getPlayerList: async ({ username, page, status, pageSize }: UserConfig) => {
    const apiUrl = `agent/direct-player?playerUsername=${username}&playerStatus=${status}&page=${page}&rows=${pageSize}`;
    return ApiService.get(apiUrl) as unknown as Promise<PlayerInfoDto>;
  },
};

export const AgentList = {
  getAgentList: async ({ username, page, status, pageSize }: UserConfig) => {
    const apiUrl = `agent/direct-agent?AgentUsername=${username}&AgentStatus=${status}&page=${page}&rows=${pageSize}`;
    return ApiService.get(apiUrl) as unknown as Promise<AgentListInfoDto>;
  },
};
