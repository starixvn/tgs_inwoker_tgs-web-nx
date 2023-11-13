export class VipData {
  birthBenefit = 0;
  cardGameRebate = 0;
  level = 0;
  levelKeepAccumulateBetAmount = 0;
  levelKeepAccumulateDeposit = 0;
  levelUpAccumulateBetAmount = 0;
  levelUpAccumulateDeposit = 0;
  liveDealerRebate = 0;
  lotteryRebate = 0;
  promotionBenefit = 0;
  quarterlyBenefit = 0;
  slotRebate = 0;
  sportsRebate = 0;
  virtualSportsRebate = 0;
}

class DataDto {
  items: VipData[] = [];
  totalCount = 0;
}

export class GetVipResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
