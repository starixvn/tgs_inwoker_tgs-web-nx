export interface GameTagItem {
  new: boolean;
  hot: boolean;
  recommend: boolean;
}

export interface GameItem {
  id: number;
  code: string;
  name: string;
  description: string;
  gpcode: string;
  gpname: string;
  status: number;
  isactive: boolean;
  type: number;
  tag: GameTagItem;
}

export interface GetGameListResDto {
  IsSuccess: boolean;
  code: number;
  data: GameItem[];
  info: string | null;
}

export interface GameTagListResDto {
  games: GameItem[];
  tag: number;
  total: number;
}

export interface RecentBigWinItem {
  gameId: number;
  gameName: string;
  gameCode: string;
  gameType: number;
  gameProviderCode: string;
  gameProviderName: string;
  createTime: Date;
  currencyName: string;
  playerName: string;
  playerCode: string;
  playerVipLevel: number;
  betId: string;
  winAmount: number;
  betAmount: number;
  profit: number;
  payout: string;
}

export interface ResponseResDto<T> {
  err: number;
  errmsg: string;
  data: T[];
  errmsgid: string | null;
}

export interface GameTypeDto {
  total: number;
  games: GameItem[];
  pageIndex: number;
  pageSize: number;
  key: any;
}


