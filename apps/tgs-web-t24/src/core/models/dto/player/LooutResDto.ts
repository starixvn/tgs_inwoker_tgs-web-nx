class DataDto {
  err = 0;
  errmsg = "";
  errmsgid = "";
  updatetime = 0;
}

export class LogoutResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
