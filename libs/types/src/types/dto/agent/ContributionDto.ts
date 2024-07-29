export enum ContributionType {
    None = 0,
    Agent = 1,
    Player = 2,
}

export type ContributionItem = {
    "username": string,
    "type": ContributionType,
} & ContributionTotal

type ContributionTotal = {
    "depositAmount": number,
    "depositHandlingFee": number,
    "withdrawalAmount": number,
    "companyAdjustAmount": number,
    "agentAdjustAmount": number,
    "bonusAdjustAmount": number,
    "bonusAmount": number,
    "betAmount": number,
    "validBetAmount": number,
    "turnover": number,
    "winLossAmount": number,
    "netProfit": number
}



export type ContributionDto = {
    data: {
        items: ContributionItem[]
        total: ContributionTotal,
        totalCount: number,
        errors: any[],
        message: string,
        valid: boolean,
        err: number,
        errmsg: string,
        errmsgid: string,
    }
}