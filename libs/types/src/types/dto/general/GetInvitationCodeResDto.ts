class DataDto {
  agentId = "";
  invitationCode = "";
  userName = "";
}

export class GetInvitationCodeResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
