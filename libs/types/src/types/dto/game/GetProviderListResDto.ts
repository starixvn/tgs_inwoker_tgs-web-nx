export interface ProviderDto {
  code: string;
  description: string;
  gametypes: number[];
  transferwallet: boolean;
  name: string;
  status: number;
}

export interface GetProviderListResDto {
  IsSuccess: boolean;
  code: number;
  data: ProviderDto[];
  info: string | null;
}
