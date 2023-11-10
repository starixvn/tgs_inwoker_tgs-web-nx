class DataDto {
  balance = 0;
}

export class GetGameBalanceResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
