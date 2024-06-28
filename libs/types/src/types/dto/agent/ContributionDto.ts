type ContributionItem = {
    "username": string,
    "type": string,
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

type ContributionTotal = {
    "depositAmount": number,
    "depositHandlingFee": number,
    "withdrawalAmount": number,
    "companyAdjustAmount": number,
    "bonusAdjustAmount": number,
    "agentAdjustAmount": number,
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