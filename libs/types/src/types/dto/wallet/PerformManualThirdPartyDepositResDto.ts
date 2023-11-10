class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "";
}

export class PerformManualThirdPartyDepositResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
