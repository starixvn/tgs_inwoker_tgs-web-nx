class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
  banktype = "string";
  note = "string";
  realname = "string";
  phone = "string";
}

export class PerformPulsaDeposit {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
