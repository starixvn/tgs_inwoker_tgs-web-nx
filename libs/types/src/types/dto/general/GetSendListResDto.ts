export interface SendItem {
  id: string;
  sender: string;
  sentOn: string;
  subject: string;
  content: string;
  haveRead: boolean;
  quotation: string;
  receiver: string;
  replied: boolean;
}
export interface GetSendListResDto {
  IsSuccess: boolean;
  code: number;
  info: string | null;
  data: {
    items: SendItem[];
    totalcount: number;
  };
}
