class WithdrawChannel {
  banktype = "";
  channelcode = "";
  channelid = "";
  channelname = "";
  displayorder = 0;
  extended = "";
  feepercentile = 0;
  id = "";
  methodcode = "";
  methodid = "";
  paymentcode = "";
  paymentid = "";
  transferlimit: {
    from: number;
    to: number;
  } = {
    from: 0,
    to: 0,
  };
}

export class GetListOfWithdrawChannelResDto {
  IsSuccess = true;
  code = 0;
  data: WithdrawChannel[] = [];
  info: string | null = null;
}
