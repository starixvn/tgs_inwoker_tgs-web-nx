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
  type: number;
  tag: GameTagItem;
  gamestatus: GameStatus;
}

export enum GameStatus {
  "ACTIVE" = 0,
  "INACTIVE",
  "ARCHIVED",
  "MAINTENANCE",
  "TESTING",
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
  createTime: string;
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

export interface HightLightMatchDto {
  sportType: number;
  sportName: string;
  leagueId: number;
  leagueName: string;
  leagueIconUrl: string;
  eventId: number;
  eventCode: string;
  eventStatus: string;
  isMainMarket: boolean;
  kickOffTime: Date;
  globalShowTime: Date;
  countryCode: string;
  isLive: boolean;
  marketCount: number;
  channelCode: string;
  teamInfo: TeamInfo;
  gameInfo: GameInfo;
  markets: Market[];
}

interface TeamInfo {
  homeId: number;
  homeName: string;
  homeIconUrl: string;
  awayId: number;
  awayName: string;
  awayIconUrl: string;
}


interface GameInfo {
  livePeriod: number;
  clockDirection: string;
  seconds: number;
  isNeutral: boolean;
  isHt: boolean;
  isBreak: boolean;
  isClosed: boolean;
  inJuryTime: number;
  delayLive: boolean;
  gameStatus: number;
  inPlayTime: string;
  liveHomeScore: number;
  liveAwayScore: number;
}


interface Market {
  sportType: number;
  eventId: number;
  betType: number;
  betTypeName: string;
  marketId: number;
  maxBet: number;
  isLive: boolean;
  marketStatus: string;
  gameMap?: number;
  gameRound?: number;
  resourceId: string;
  category: number;
  showCategory: string;
  sort: number;
  combo: number;
  selections: SelectionInfo[];
}

interface SelectionInfo {
  key: string;
  keyName: string;
  point?: number;
  point2?: number;
  oddsPrice: OddsPriceInfo;
}

interface OddsPriceInfo {
  parlayPrice: number;
  malayPrice: number;
  hongKongPrice: number;
  decimalPrice: number;
  indoPrice: number;
  americanPrice: number;
}

export interface LastBetDto {
  id: string;
  playerName: string;
  PlayerCode: string;
  brandId: string;
  betAmount: number;
  gameId: number;
  gameName: string;
  gameProviderCode: string;
  payout: string
}

