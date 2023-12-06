class DataDto {
  switchon = false;
}

export class GetAffiliateStatusResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
