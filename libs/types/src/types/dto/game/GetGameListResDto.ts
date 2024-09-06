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
