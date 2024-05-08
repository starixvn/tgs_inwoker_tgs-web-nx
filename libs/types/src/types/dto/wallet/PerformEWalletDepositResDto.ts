class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "";
  note = "";
  emoneyname = "";
  phone = "";
  errmsg = "";
}

export class PerformEWalletDepositResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
