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

export interface ResponseResDto<T> {
  err: number;
  errmsg: string;
  data: T[];
  errmsgid: string | null;
}

export interface CategoryDto {
  total: number;
  games: GameItem[];
  pageIndex: number;
  pageSize: number;
  gameType: number;
}
