export interface RegisterV2CreatePlayerReqDto {
  username: string;
  email: string;
  pwd: string;
  upper?: string;
  invitationcode?: string;
  testplayer: boolean;
}
