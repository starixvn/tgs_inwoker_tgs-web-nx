class DataDto {
  main = 0;
}

export class GetWalletBalanceResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
