interface DataDto {
  amount: number;
  buckettype: string;
}
export interface GetPlayerBucketDto {
  IsSuccess: boolean;
  code: number;
  data: DataDto[];
  info: string | null;
}
