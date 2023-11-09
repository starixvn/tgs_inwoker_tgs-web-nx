class BrandLanguage {
  "culturecode": string;
}

export class GetBrandLanguageResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: BrandLanguage[] = [];
}
