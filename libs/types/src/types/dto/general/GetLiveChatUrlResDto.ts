class DataDto {
  name = "";
  setting = "";
}
export class GetLiveChatUrlResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
