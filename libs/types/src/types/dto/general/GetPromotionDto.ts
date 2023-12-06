class Promotion {
  campaignDetail = "";
  content = "";
  desktopBanner = "";
  from = "";
  id = "";
  localization = "";
  mobileBanner = "";
  name = "";
  order = 0;
  promotionType = "";
  subSubject = "";
  terms = "";
  to = "";
  vipLevels: number[] = [];
}

export class GetPromotionDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: Promotion[] = [];
}
