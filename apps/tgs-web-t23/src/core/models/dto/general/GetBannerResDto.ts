class Banner {
  desktopurl = "";
  id = "";
  mobileurl = "";
  navurl = "";
  alt = "";
  title = "";
}

export class GetBannerResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: Banner[] = [];
}
