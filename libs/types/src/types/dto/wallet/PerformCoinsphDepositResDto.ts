class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "string";
  note = "string";
  realname = "string";
  phone = "string";
  address = "string";
}

export class PerformCoinsphDepositResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
