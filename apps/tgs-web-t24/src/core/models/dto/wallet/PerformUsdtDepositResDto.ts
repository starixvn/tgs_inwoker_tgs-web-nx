export class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "";
}

export class PerformUsdtDepositResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
