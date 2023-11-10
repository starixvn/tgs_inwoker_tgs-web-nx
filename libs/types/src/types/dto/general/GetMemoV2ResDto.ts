class DataDto {
  content = "";
  haveRead = true;
  id = "";
  quotation = "";
  receiver = "";
  replied = true;
  sender = "";
  sentOn = "";
  subject = "";
}
export class GetMemoV2ResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
