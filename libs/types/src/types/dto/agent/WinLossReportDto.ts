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

type Item = {
    id: string,
    username: string,
    memberType: string,
} & Total;

export type WinLossReportDto = {
    data: {
        items: Item[],
        total: Total,
        totalCount: number,
        errors: any[],
        message: string,
        valid: boolean,
    }
    err: number,
    errmsg: string,
    errmsgid: string,
}

