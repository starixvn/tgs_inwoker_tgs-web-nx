class RouletteHistory {
  createdon = "";
  date = "";
  id = "";
  itemindex = 0;
}

export class GetDepositAccumulateRouletteHistoryResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: RouletteHistory[] = [];
}
