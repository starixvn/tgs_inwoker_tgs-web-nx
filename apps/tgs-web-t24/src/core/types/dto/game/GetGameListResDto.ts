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
  isactive: boolean;
  type: number;
  tag: GameTagItem;
}

export interface GetFavoriteGameResDto {
  IsSuccess: boolean;
  code: number;
  data: GameItem[];
  info: string | null;
}
