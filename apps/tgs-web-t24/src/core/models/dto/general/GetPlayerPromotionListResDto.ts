export class PlayerPromotion {
  joinedOn = "";
  promotionName = "";
}

class DataDto {
  items: PlayerPromotion[] = [];
  totalCount = 0;
}

export class GetPlayerPromotionListResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
