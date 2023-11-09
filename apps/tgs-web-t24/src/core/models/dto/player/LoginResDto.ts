class DataDto {
  err = 0;
  errmsg = "";
  errmsgid = "";
  token = "";
  logintime = 0;
}

export class LoginResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
