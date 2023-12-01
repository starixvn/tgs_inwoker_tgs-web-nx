export interface RegisterV2CreatePlayerReqDto {
  username: string;
  pwd: string;
  upper?: string;
  invitationcode?: string;
  testplayer: boolean;
}
