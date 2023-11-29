export interface InboxItemDetail {
  content: string;
  haveRead: boolean;
  id: string;
  quotation: string;
  receiver: string;
  replied: boolean;
  sender: string;
  sentOn: string;
  subject: string;
}

export interface GetInboxItemDetailResDto {
  IsSuccess: boolean;
  code: number;
  info: string | null;
  data: InboxItemDetail;
}
