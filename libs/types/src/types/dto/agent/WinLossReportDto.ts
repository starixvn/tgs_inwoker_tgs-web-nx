type Total = {
    roundCount: number,
    turnover: number,
    winLoss: number,
    companyWinLoss: number,
    special: number,
    agentSpecial: number,
    companySpecial: number,
    agentTotal: number,
    companyTotal: number,
    agentWinLoss: number,
}

export type WinLossReportItem = {
    id: string,
    username: string,
    memberType: string,
} & Total;

export type WinLossReportDto = {
    data: {
        items: WinLossReportItem[],
        total: Total,
        totalCount: number,
        errors: any[],
        message: string,
        valid: boolean,
        err: number,
        errmsg: string,
        errmsgid: string,
    }
    
}

export type WinLostBreadcrumbDto = {
    data: {
        username: string,
        id: string,
        memberType: string,
    }[]
}

export type PlayerDetailDto = {
    data: {
        bonus: number, 
        bonusAdjust: number,
        companyAdjust: number, 
        agentAdjust: number
        err: number,
        errmsg: string,
        errmsgid: null | string,
    },
}