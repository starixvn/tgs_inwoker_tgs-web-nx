export interface ResetPasswordResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
  };
  info: string | null;
}
