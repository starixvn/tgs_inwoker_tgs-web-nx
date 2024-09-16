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
  limit: number;
}

export interface RecentBigWins {
  GameId: number;
  GameName: string;
  GameCode: string;
  GameType: number;
  GameProviderCode: string;
  GameProviderName: string;
  CreateTime: Date;
  CurrencyName: string;
  PlayerName: string;
  PlayerCode: string;
  PlayerVipLevel: number;
  BetId: string;
  WinAmount: number;
  BetAmount: number;
  Profit: number;
  Payout: string;
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
  gameType: number;
}

export interface ProviderGameDto {
  total: number;
  games: GameItem[];
  pageIndex: number;
  ProviderCode: string;
}


