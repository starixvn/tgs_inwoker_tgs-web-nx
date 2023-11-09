export class BrandCommunication {
  type = "";
  phone = "";
  appid = "";
  qrcodeurl = "";
}

export class GetBrandCommunicationResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: BrandCommunication[] = [];
}
