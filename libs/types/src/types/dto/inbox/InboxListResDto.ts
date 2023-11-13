class Inbox {
  id = "";
  createon = "";
  subject = "";
  content = "";
  isread = false;
  localization = "";
}

class DataDto {
  items: Inbox[] = [];
}

export class InboxListResDto {
  IsSuccess = true;
  code = 0;
  data: DataDto = new DataDto();
  info: string | null = null;
}
