import {
  AddRealNameResDto,
  GetIDCardNoResDto,
  GetMemberInfoResDto,
  GetPromoteBillResDto,
  GetPromoteUserResDto,
  GetRegisterStatusResDto,
  LoginResDto,
  LogoutResDto,
  RegisterResDto,
  RegisterV2CreatePlayerReqDto,
  RegisterV2CreatePlayerResDto,
  RegisterV2GetRegisterStepResDto,
  ResetPasswordResDto,
  SetBirthDateResDto,
  UpdateIMResDto,
  UpdateMemberNameAndICResDto,
  UpdatePhoneResDto,
  VerifyForgotPasswordResDto,
  RegisterV2SetRealNameDto,
  SetPhoneResDto,
} from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";
import config from "../config/config";

function CheckUserName(username: string) {
  return ApiService.get(`Player/checkUsername?=${username}`);
}

function LoginGoogle(token: string) {
  return ApiService.post("Player/login-google", {
    token: token,
    platformtype: config.isPC,
  }) as unknown as Promise<LoginResDto>;
}

function Login(username: string, password: string) {
  return ApiService.post("Player/Login", {
    username: username,
    password: password,
    //@ts-ignore
    platformtype: config.isPC,
  }) as unknown as Promise<LoginResDto>;
}

function Register(
  username: string,
  pwd: string,
  confirmpwd: string,
  invitationcode = "",
  upper: any,
) {
  const currency = import.meta.env.VITE_CURRENCY;
  return ApiService.post("Player/create", {
    username,
    currency,
    pwd,
    confirmpwd,
    invitationcode,
    agent: true,
    //@ts-ignore
    testplayer: config.testplayer,
    upper,
  }) as unknown as Promise<RegisterResDto>;
}

function Activation(username: string, pwd: string, areacode: string, phone: string) {
  return ApiService.post("player/init-phone", {
    username,
    pwd,
    areacode,
    phone,
  });
}

function VerifyActivation(securitykey: string, validatecode: string) {
  return ApiService.put("player/init-phone", {
    securitykey,
    validatecode,
  });
}

function ActivationEmail(email: string) {
  return ApiService.post("player/init-email", {
    email,
  });
}

function VerifyActivationEmail(securitykey: string, validatecode: string) {
  return ApiService.put("player/init-email", {
    securitykey,
    validatecode,
  });
}

async function Logout() {
  const response = (await ApiService.del("Player/logout", {})) as unknown as LogoutResDto;

  if (response.IsSuccess) {
    localStorage.removeItem("token");
  }

  return response;
}

function GetMemberInfo() {
  return ApiService.get("Player/info") as unknown as Promise<GetMemberInfoResDto>;
}

function SetBirthDate(yyyymmdd: string) {
  return ApiService.patch("player/birthdate", {
    birthdate: yyyymmdd,
  }) as unknown as SetBirthDateResDto;
}

function UpdateIM(value: string, im: string, param: string) {
  return ApiService.patch(`Player/${im}`, {
    [param]: value,
  }) as unknown as Promise<UpdateIMResDto>;
}

function ChangeWithdrawalPassword(newpwd: string, validateCode: string, securityKey: string) {
  return ApiService.patch("pay/password", {
    newpwd: newpwd,
    validatecode: validateCode,
    securitykey: securityKey,
  });
}

function AddRealName(name: string, id: string) {
  return ApiService.patch("player/identity", {
    realname: name,
    id: id,
  }) as unknown as Promise<AddRealNameResDto>;
}

function CheckRealName(id: string) {
  return ApiService.get(`Player/identity/check/${id}`);
}

function AddWithdrawalPassword(password: string) {
  return ApiService.post("pay/password", {
    pwd: password,
  });
}

function GetChangeWithdrawalPasswordVerificationCode() {
  return ApiService.post("pay/password/validate-code", {});
}

function VerifyEmail(email: string) {
  return ApiService.post("player/email", {
    email: email,
  });
}

function UpdateEmail(securitykey: string, validateCode: string) {
  return ApiService.put("player/email", {
    securitykey: securitykey,
    validatecode: validateCode,
  });
}

function SetEmail(email: string) {
  return ApiService.patch("player/email", {
    email,
  }) as unknown as Promise<SetPhoneResDto>;
}

function VerifyPhone(phone: string, areacode: string) {
  return ApiService.post("player/phone", {
    phone: phone,
    area: areacode,
  });
}

function UpdatePhone(securitykey: string, validateCode: string) {
  return ApiService.put("player/phone", {
    securitykey: securitykey,
    validatecode: validateCode,
  }) as unknown as Promise<UpdatePhoneResDto>;
}

function SetPhone(areacode: string, phone: string) {
  return ApiService.patch("player/phone", {
    area: areacode,
    phone: phone,
  }) as unknown as Promise<SetPhoneResDto>;
}

function UpdatePassword(oldpwd: string, newpwd: string) {
  return ApiService.put("player/password", {
    oldpwd: oldpwd,
    newpwd: newpwd,
  });
}

function VerifyForgotPassword(email: string, areaCode: string, phone: string) {
  return ApiService.post("player/password/forgot", {
    email: email,
    areaCode: areaCode,
    phone: phone,
  }) as unknown as Promise<VerifyForgotPasswordResDto>;
}

function ResetPassword(securitykey: string, validatecode: string, newpwd: string) {
  return ApiService.post("player/password/reset", {
    securitykey: securitykey,
    validatecode: validatecode,
    newpwd: newpwd,
  }) as unknown as Promise<ResetPasswordResDto>;
}

function GetIDCardNo() {
  return ApiService.get("pc/authentication") as unknown as Promise<GetIDCardNoResDto>;
}

function GetPromoteUser(page: number, limit: number) {
  return ApiService.get(
    `pc/user/promoteUser?page=${page}&page_size=${limit}`,
  ) as unknown as Promise<GetPromoteUserResDto>;
}

function GetPromoteBill(page: number, limit: number) {
  return ApiService.get(
    `pc/userPromoteBill?page=${page}&page_size=${limit}`,
  ) as unknown as Promise<GetPromoteBillResDto>;
}

function UpdateMemberName(token: string, name: string) {
  return ApiService.post(
    "member/editSurename",
    {
      name,
      token,
    },
    true,
  );
}

function UpdateMemberNameAndIC(realname: string, id: string, file: File | null) {
  const request = file
    ? ApiService.postFile(
        `player/identity/upload`,
        file,
        {
          realname,
          id,
        },
        true,
      )
    : ApiService.patch(`player/identity`, {
        realname,
        id,
      });

  return request as unknown as Promise<UpdateMemberNameAndICResDto>;
}

function NewRegister(type: string, input: any) {
  return ApiService.post("player/register", {
    type: type,
    input: input,
  }) as unknown as Promise<RegisterV2CreatePlayerResDto>;
}

function GetRegisterStatus() {
  return ApiService.get("player/register") as unknown as Promise<GetRegisterStatusResDto>;
}

function UploadIC(file: File) {
  //@ts-ignore
  return ApiService.postFile(`player/identity/upload`, file, {});
}

// register v2
function RegisterV2CreatePlayer(createPlayerReqDto: RegisterV2CreatePlayerReqDto) {
  return ApiService.post("player/register", {
    type: "CreatePlayer",
    input: createPlayerReqDto,
  }) as unknown as Promise<RegisterV2CreatePlayerResDto>;
}

function registerV2SetRealName(registerV2SetRealNameDto: RegisterV2SetRealNameDto) {
  return ApiService.post("player/register", {
    type: "SetRealName",
    input: registerV2SetRealNameDto,
  }) as unknown as Promise<RegisterV2CreatePlayerResDto>;
}

function RegisterV2GetRegisterStep() {
  return ApiService.get("player/register") as unknown as Promise<RegisterV2GetRegisterStepResDto>;
}

function UpdatePhoneV2(securitykey: string, validateCode: string) {
  return ApiService.post("player/register", {
    type: "InitPhone",
    input: {
      input: "Valid",
      data: {
        securitykey: securitykey,
        validatecode: validateCode,
      },
    },
  }) as unknown as Promise<UpdatePhoneResDto>;
}

function UpdateEmailV2(securitykey: string, code: string) {
  return ApiService.post("player/register", {
    type: "InitEmail",
    input: {
      input: "Valid",
      data: {
        securitykey: securitykey,
        code: code,
      },
    },
  }) as unknown as Promise<UpdatePhoneResDto>;
}

function checkValidateCode(securitykey: string, code: string) {
  return ApiService.post("player/validate-code/check", {
    securitykey,
    validatecode: code,
  });
}

function checkPhoneDuplicate(area: string, phone: string) {
  return ApiService.post("player/phone/check", {
    area: area,
    phone: phone,
  }) as unknown;
}

export const AccountService = {
  CheckUserName,
  Login,
  LoginGoogle,
  Register,
  Activation,
  VerifyActivation,
  ActivationEmail,
  VerifyActivationEmail,
  Logout,
  GetMemberInfo,
  AddRealName,
  CheckRealName,
  ChangeWithdrawalPassword,
  AddWithdrawalPassword,
  GetChangeWithdrawalPasswordVerificationCode,
  VerifyEmail,
  UpdateEmail,
  VerifyPhone,
  UpdatePhone,
  SetPhone,
  SetEmail,
  UpdatePassword,
  VerifyForgotPassword,
  ResetPassword,
  GetIDCardNo,
  GetPromoteUser,
  GetPromoteBill,
  UpdateMemberName,
  UploadIC,
  SetBirthDate,
  NewRegister,
  UpdateIM,
  GetRegisterStatus,
  UpdateMemberNameAndIC,
  RegisterV2CreatePlayer,
  RegisterV2GetRegisterStep,
  UpdatePhoneV2,
  UpdateEmailV2,
  registerV2SetRealName,
  checkPhoneDuplicate,
  checkValidateCode,
};
