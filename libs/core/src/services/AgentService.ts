<<<<<<< HEAD
import { ProfitShareDto, WinLossReportDto, WinLostBreadcrumbDto } from '@tgs-web-nx/types';
=======
import { WinLossReportDto, ProfitShareDto } from '@tgs-web-nx/types';
>>>>>>> t29/agent-sean-v2
import { ApiService } from "../api-services/services/ApiService";

type BreadcrumbConfig = {
    username: string,
    memberType?: string,
}

export type WinLostConfig = {
    from: string,
    to: string,
    downline: boolean,
    page?: number,
    rows?: number,
} & BreadcrumbConfig


const getReport = ({
    username,
    from,
    to,
    downline,
    page = 1,
    rows = 20,
    memberType = 'agent',
}: WinLostConfig) => {
    console.log({downline, username});
    
    const apiUrl = `AgentWinLossReport/agentWinLoss?username=${username}&from=${from}T16:00:00.000Z&to=${to}T16:00:00.000Z&downline=${downline}&page=${page}&rows=${rows}&memberType=${memberType}`;

    return ApiService.get(apiUrl) as unknown as Promise<WinLossReportDto>
};


const getBreadcrumb = ({
    username,
    memberType = 'agent',
}: BreadcrumbConfig) => {
    const apiUrl = `AgentWinLossReport/breadcrumb?&username=${username}&memberType=${memberType}`;
    return ApiService.get(apiUrl) as unknown as Promise<WinLostBreadcrumbDto>
};


export const WinLostReport = {
    getReport,
    getBreadcrumb
}

export const ProfitShare = {
    getProfitShare: () => ApiService.get('AgentDividendReport/beforehand') as unknown as Promise<ProfitShareDto>
}