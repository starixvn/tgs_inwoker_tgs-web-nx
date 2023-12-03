export interface BankCard {
  banktype: string;
  detail: {
    phone: string;
    address: string;
    name: string;
    bankAccount: string;
  };
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
