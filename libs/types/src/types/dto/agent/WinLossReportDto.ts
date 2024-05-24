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
}


type Item = {
    id: string,
    username: string,
    memberType: string,
} & Total;

export type WinLossReportDto = {
    items: Item[] | null,
    total: Total | null,
    totalCount: number,
    errors: any[],
    message: string,
    valid: boolean,
}

