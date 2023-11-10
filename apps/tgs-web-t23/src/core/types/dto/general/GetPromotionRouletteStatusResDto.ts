class DataDto {
  id = "";
  itemindex = 0;
}

export class GetPromotionRouletteStatusResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
