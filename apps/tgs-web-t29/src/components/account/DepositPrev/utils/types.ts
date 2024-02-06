// Structure: methodcode => paymentcode => channel[]

export interface Channel {
  channelid: string;
  channelname: string;
  displayorder: number;
  extended: unknown;
  fees: number;
  id: string,
  transferlimit: {
    from: number;
    to: number;
  }
}

export interface Method {
  channel: Channel[];
  displayname: string;
  methodcode: string;
  methodid: string
}

export interface Payment {
  paymentcode: string;
  paymentid: string;
  displayorder: number;
}



export interface DepositMethodList {
  methodcode: string;
  methodid: string;
  displayname: string;
  paymentList: Payment[]
}
