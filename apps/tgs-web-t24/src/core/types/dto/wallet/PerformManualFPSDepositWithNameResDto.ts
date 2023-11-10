class DataDto {
  account = "";
  name = "";
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "";
}

export class PerformManualFPSDepositWithNameResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
