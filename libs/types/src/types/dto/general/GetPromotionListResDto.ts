export class PromotionCampaignDetail {
  percentage = 0;
  bonusAmountLimit = 0;
  turnoverMultiple = 0;
}

interface PromotionLocalization {
  [key: string]: {
    desktopBanner: string;
    mobileBanner: string;
    content: string;
    terms: string;
  };
}

export class Promotion {
  campaignDetail: PromotionCampaignDetail[] = [];
  content = "";
  desktopBanner = "";
  from = "";
  id = "";
  localization: PromotionLocalization = {};
  mobileBanner = "";
  name = "";
  order = 0;
  promotionType = "";
  subSubject = "";
  terms = "";
  to = "";
  vipLevels: number[] = [];
}

export class GetPromotionListResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: Promotion[] = [];
}
