export class MemberInfo {
  bankinfoauthentication = true;
  birthdate: string | null = null;
  email: string | null = null;
  emailauthentication = true;
  facebookmessenger: string | null = null;
  identityauthentication = true;
  identityformid: string | null = null;
  identityformstatus = 0;
  autotransfertogame = true;
  registercompleted: boolean | string = "";
  issetpaypassword = true;
  line: string | null = null;
  phone: string | null = null;
  areacode = "";
  phoneauthentication = false;
  playercode: string | null = null;
  qq: string | null = null;
  realname: string | null = null;
  telegram: string | null = null;
  username: string | null = null;
  viber: string | null = null;
  viplevel = 0;
  wechat: string | null = null;
  whatsapp: string | null = null;
}

export class GetMemberInfoResDto {
  IsSuccess = true;
  code = 0;
  data: MemberInfo = new MemberInfo();
  info: string | null = null;
}
