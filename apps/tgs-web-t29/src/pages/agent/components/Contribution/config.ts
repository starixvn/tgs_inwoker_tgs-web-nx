export type TableKey = 'username' | 'type' | 'depositAmount' | 'withdrawalAmount' |  'agentAdjustAmount' | 'bonusAdjustAmount' | 'bonusAmount' | 'betAmount' | 'validBetAmount' | 'turnover' | 'winLossAmount' | 'netProfit'

export const mapTable: Record<TableKey, string> = {
  "username": "使用者名稱",
  "type": "帳戶類型",
  "depositAmount": "存款金額",
  "withdrawalAmount": "提款額",
  "bonusAmount": "紅利金額",
  "bonusAdjustAmount": "優惠帳單",
  "agentAdjustAmount": "代理商帳",
  "betAmount": "額",
  "validBetAmount": "有效投入",
  "turnover": "流水",
  "winLossAmount": "獲利金額",
  "netProfit": "淨利"
};

