export interface InboxItem {
  id: string;
  sender: string;
  subject: string;
  haveRead: boolean;
  replied: boolean;
}

export interface GetInboxListResDto {
  IsSuccess: boolean;
  code: number;
  info: string | null;
  data: {
    items: InboxItem[];
    totalcount: number;
  };
}
