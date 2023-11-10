interface DataDto {
  err: number;
  errmsg: string;
  errmsgid: string;
  success: boolean;
}

export interface JoinPromotionResDto {
  IsSuccess: boolean;
  code: number;
  info: string | null;
  data: DataDto;
}
