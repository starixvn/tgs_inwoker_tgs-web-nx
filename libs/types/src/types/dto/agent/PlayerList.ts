type PlayerInfo = {
  playerUsername: string;
  vipLevel: number;
  registeredOn: string;
  lastLoginOn: string;
  totalDepositAmount: number;
  totalWithdrawAmount: number;
  playerStatus: number;
};

export type PlayerInfoDto = {
  IsSuccess: boolean;
  code: number;
  data: {
    items: PlayerInfo[];
    totalCount: number;
    errors: any[];
    message: string;
    valid: boolean;
  };
  info: string | null;
};
