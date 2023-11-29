export interface SendItemDetail {
  comeFrom: string;
  content: string;
  id: string;
  receiver: string;
  receiverType: string;
  sender: string;
  sentOn: string;
  subject: string;
}

export interface GetSendItemDetailResDto {
  IsSuccess: boolean;
  code: number;
  info: string | null;
  data: SendItemDetail;
}
