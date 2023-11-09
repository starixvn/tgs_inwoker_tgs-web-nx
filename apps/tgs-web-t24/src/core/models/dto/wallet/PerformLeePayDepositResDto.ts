class DataDto {
  amount = 0;
  paymentid = "";
  promotionid = "";
}
export class PerformLeePayDepositResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
