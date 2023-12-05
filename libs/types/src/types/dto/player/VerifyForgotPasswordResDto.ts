export interface VerifyForgotPasswordResDto {
  IsSuccess: boolean;
  code: number;
  data: string;
  info: string | null;
}
