export class Brand {
  brandId = "";
  code = "";
  desktopLogoUrl = "";
  hasInvitationCode = false;
  loadingUrl = "";
  mobileLogoUrl = "";
  playerIdentityAuthenticationEnabled = false;
  playerRegisterFlowSettings = "";
  smsEnable = false;
}

export class GetBrandResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: Brand = new Brand();
}
