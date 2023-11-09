class DataDto {
  id = "";
  itemindex = 0;
}

export class GetPromotionRouletteResultResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
