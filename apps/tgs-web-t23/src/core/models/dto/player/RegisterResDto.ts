class DataDto {
  err = 0;
  errmsg = "";
  errmsgid = "";
  uid = "";
  isnew = true;
}

export class RegisterResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
