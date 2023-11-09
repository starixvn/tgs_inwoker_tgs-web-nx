class Roulette {
  "promotionid" = "";
  "promotiontype" = "";
  "roulettecount" = 0;
}

export class GetPromotionRouletteCountResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: Roulette[] = [];
}
