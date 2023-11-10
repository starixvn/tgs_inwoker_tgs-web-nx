class DataDto {
  err = 0;
  errmsg = "";
  errmsgid = "";
  token = "";
  expires = 0;
}

export class GetSiteTokenResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
