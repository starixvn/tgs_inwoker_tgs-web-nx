import { BankCard, DoTransferResDto } from "../dto";

interface TransferChannel {
  banktype: string;
  channelcode: string;
  channelid: string;
  channelname: string;
  displayorder: number;
  extended: unknown; //待確認
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

interface DepositChannelList {
  channelCode: string;
  channels: TransferChannel[];
}

export interface DepositType {
  displayorder: number;
  method: {
    channelid: string;
    channelname: string;
    displayorer: number;
    methodcode: string;
    methodid: string;
    displayname: string;
    extended: {};
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
  depositChannelList: DepositChannelList[];
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
