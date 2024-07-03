import {
  AgentInfotDto,
  AgentListInfoDto,
  ContributionDto,
  PlayerDetailDto,
  PlayerInfoDto,
  ProfitShareDto,
  WinLossReportDto,
  WinLostBreadcrumbDto,
} from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";

// 麵包屑 payload
type BreadcrumbConfig = {
  username: string;
  memberType?: string;
};

// 輸贏報表 payload
export type WinLostConfig = {
  from: string;
  to: string;
  downline: boolean;
  page?: number;
  rows?: number;
} & BreadcrumbConfig;

// 玩家細節 payload
export type PlayerDetailConfig = {
  from: string;
  to: string;
  agentId: string;
}

// 玩家列表、代理列表 payload
export type UserConfig = {
  username?: string;
  status?: string | null;
  page?: number;
  pageSize?: number;
  rows?: number;
};

/**
 * 取得輸贏報表
 * @param payload WinLostConfig
 * @returns  
 */
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

/**
 * 取得輸贏報表麵包屑
 * @param payload BreadcrumbConfig
 * @returns  
 */
const getBreadcrumb = ({ username, memberType = "agent" }: BreadcrumbConfig) => {
  const apiUrl = `AgentWinLossReport/breadcrumb?&username=${username}&memberType=${memberType}`;
  return ApiService.get(apiUrl) as unknown as Promise<WinLostBreadcrumbDto>;
};

/**
 * 取得玩家細節
 * @param payload PlayerDetailConfig
 * @returns  
 */
const getPlayerDetail = ({
  agentId,
  from,
  to,
}: PlayerDetailConfig) => {
  const apiUrl = `agentWinLossReport/agentPlayerSpecialDetail?&agentId=${agentId}&from=${from}T16:00:00.000Z&to=${to}T16:00:00.000Z`;
  return ApiService.get(apiUrl) as unknown as Promise<PlayerDetailDto>
}


const WinLostReport = {
    getReport,
    getBreadcrumb,
    getPlayerDetail
}


const ProfitShare = {
  getProfitShare: () =>
    ApiService.get("AgentDividendReport/beforehand") as unknown as Promise<ProfitShareDto>,
};


const AgentInfo = {
  getAgentInfo: async () => {
    return ApiService.get("agent/info") as unknown as Promise<AgentInfotDto>;
  },
};


const PlayerList = {
  getPlayerList: async ({ username, page, status, pageSize }: UserConfig) => {
    const apiUrl = `agent/direct-player?playerUsername=${username}&playerStatus=${status}&page=${page}&rows=${pageSize}`;
    return ApiService.get(apiUrl) as unknown as Promise<PlayerInfoDto>;
  },
};


const AgentList = {
  getAgentList: async ({ username, page, status, pageSize }: UserConfig) => {
    const apiUrl = `agent/direct-agent?AgentUsername=${username}&AgentStatus=${status}&page=${page}&rows=${pageSize}`;
    return ApiService.get(apiUrl) as unknown as Promise<AgentListInfoDto>;
  },
};

export type ContributionConfig = {
  from: string,
  to: string,
  desc: boolean,
  page: number,
  rows: number,
}

/**
 * 取得代理貢獻
 * @param payload WinLostConfig
 * @returns  
 */
const getContribution = ({
  from,
  to,
  desc,
  page = 1,
  rows = 10,
}: ContributionConfig) => {
  const apiUrl = `agentContributionReport?from=${from}T16:00:00.000Z&to=${to}T16:00:00.000Z&page=${page}&rows=${rows}&desc=${desc}`;

  return ApiService.get(apiUrl) as unknown as Promise<ContributionDto>;
};

const Contribution = {
  getContribution,
}

export {
  AgentInfo, // 代理資訊
  PlayerList, // 玩家列表
  WinLostReport, // 輸贏報表
  AgentList, // 代理列表
  ProfitShare, // 分紅報表
  Contribution, // 代理貢獻
}