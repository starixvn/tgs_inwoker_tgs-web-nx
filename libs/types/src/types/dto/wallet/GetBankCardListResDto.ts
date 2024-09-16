export interface BankCardDetail {
  phone: string;
  address: string;
  name: string;
  bankAccount: string;
  bankName: string;
}

export interface BankCard {
  banktype: string;
  detail: BankCardDetail;
  id: string;
  default: boolean;
  paymentchannelid: string;
}

export interface GetBankCardListResDto {
  IsSuccess: boolean;
  code: number;
  data: BankCard[];
  info: string | null;
}
