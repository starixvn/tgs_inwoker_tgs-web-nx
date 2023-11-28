export interface GetGameBalanceResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    balance: number;
  };
  info: string | null;
}
