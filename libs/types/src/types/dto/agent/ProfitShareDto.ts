/**
 * @from : 開始時間
 * @to : 結束時間
 * @companyWinLossAmount : 公司輸贏金額
 * @bonus : 紅利金額
 * @directDividendAmount : 直屬玩家分紅金額
 * @dividendPercentage : 分紅%
 * @teamContributionAmount : 團隊獻
 * @totalDividendAmount : 總分紅金額
 * @bonusAdjustAmount : 優惠調帳
 * @agentAdjustAmount : 代理調帳
 * @productFeeAmount : 產品費用
 * @negativeAgentDividendAmount : 負分紅金額
 * @sentOn : 派發時間
 */
export type TProfitShare = {
  from: Date,
  to: Date,
  companyWinLossAmount: number,
  bonus: number,
  directDividendAmount: number,
  dividendPercentage: number,
  teamContributionAmount: number,
  totalDividendAmount: number,
  bonusAdjustAmount: number,
  agentAdjustAmount: number,
  productFeeAmount: number,
  negativeAgentDividendAmount : number,
  sentOn : string | null,
}

export type ProfitShareDto = {
  data: {
      previous: TProfitShare[],
      current: TProfitShare[],
  },
  err: number,
  errmsg: string,
  errmsgid: null | string,
}