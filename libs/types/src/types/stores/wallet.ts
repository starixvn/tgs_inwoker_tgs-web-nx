import { BankCard, DoTransferResDto } from "../dto";

export type BankExtended = {
  bankAccount?: string,
  eMoneyName?: string,
  logo?: string,
  phone?: string,
  name?: string,
}

export type CoinsphExtended = {
  phone?: string,
  name?: string,
  qrCode?: string,
}

export type EWalletExtended = {
  bankAccount?: string,
  eMoneyName?: string,
  phone?: string,
  name?: string,
}

export type FPSExtended = {
  email?: string,
  fpsId?: string,
  phone?: string,
  qrCodeFileUrl?: string,
}

export type PulsaExtended = {
  phone?: string,
}

export type ThirdPartyExtended = {
  qrCode?: string,
  qrCodeFileUrl?: string,
  QrCode?: string,
}

export type UsdtExtended = {
  rate?: string,
  qrCode?: string,
  address?: string,
}

export type Extended = 
  BankExtended & CoinsphExtended & EWalletExtended
  & FPSExtended & PulsaExtended & ThirdPartyExtended & UsdtExtended

export interface TransferChannel {
  banktype: string;
  channelcode: string;
  channelid: string;
  channelname: string;
  displayorder: number;
  extended: Extended;
  feepercentile: number;
  methodcode: string;
  methodid: string;
  paymentcode: string;
  paymentid: string;
  fees: number;
  id: string;
  transferlimit: {
    from: number;
    to: number;
  };
  channel: TransferChannel[]
}


export interface FilterDepositList {
  code: string;
  channels: TransferChannel[];
} 

// export interface DepositChannelList {
//   channelCode: string;
//   channels: TransferChannel[];
// }

export interface DepositType {
  displayorder: number;
  method: {
    channelid: string;
    channelname: string;
    displayorder: number;
    methodcode: string;
    methodid: string;
    displayname: string;
    extended: Extended;
    fees: number;
    id: string;
    transferlimit: {
      from: number;
      to: number;
    };
  }[];
  paymentcode: string;
  paymentid: string;
}

export interface WalletState {
  loading: true;
  updateBalanceloading: false;
  transferLoading: false;
  message: "";
  depositList: TransferChannel[];
  depositTypeList: DepositType[];
  depositChannelList: FilterDepositList[];
  depositData: TransferChannel[];
  depositLoading: false;
  depositResult: null;
  cancelDepositResult: null;
  depositUploadResult: null;
  addBankCardResult: null;
  deleteBankCardResult: null;
  addBillingResult: null;
  withdrawalResult: null;
  transferResult: null | DoTransferResDto;
  withdrawalAllResult: null;
  balanceList: any[];
  bankCardList: BankCard[];
  bankList: any[];
  withdrawalList: {
    banktype: string;
    channel: TransferChannel[];
  }[];
  mainBalance: number;
  mainSymbol: string;
  mainId: string;
  autotransfer: null | boolean;
  depositMinLimit: number;
  depositMaxLimit: number;
  withdrawalMinLimit: number;
  withdrawalMaxLimit: number;
}
