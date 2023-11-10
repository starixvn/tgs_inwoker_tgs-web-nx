import React, { MemoExoticComponent, NamedExoticComponent } from "react";
import { ValueOf } from "@tgs-web-nx/types";
import ProfileMenuMobile from "@/pages/profile/components/ProfileMenu/ProfileMenuMobile";
import ProfileBirthDatePage from "@/core/components/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/core/components/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/core/components/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/core/components/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/core/components/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/core/components/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/core/components/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/core/components/Profile/ProfileLine";
import ProfileNamePage from "@/core/components/Profile/ProfileName";
import ProfilePhonePage from "@/core/components/Profile/ProfilePhone";
import ProfileQQPage from "@/core/components/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/core/components/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/core/components/Profile/ProfileTelegram";
import ProfileViberPage from "@/core/components/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/core/components/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/core/components/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/core/components/Profile/ProfileWhatsapp";

export const ProfilePathEnum = {
  PROFILE: "/profile",
  NAME: "/profile/name",
  WECHAT: "/profile/wechat",
  BIRTHDATE: "/profile/birthdate",
  QQ: "/profile/qq",
  FB: "/profile/fb",
  TELEGRAM: "/profile/telegram",
  LINE: "/profile/line",
  VIBER: "/profile/viber",
  WHATSAPP: "/profile/whatsapp",
  EMAIL: "/profile/email",
  CHANGE_EMAIL: "/profile/changeemail",
  CHANGE_PHONE: "/profile/changephone",
  PHONE: "/profile/phone",
  CHANGE_PASSWORD: "/profile/changepassword",
  WIDHDRAWAL_PASSWORD: "/profile/withdrawalpassword",
  RESET_WITHDRAWAL_PASSWORD: "/profile/resetwithdrawalpassword",
  CHANGE_WITHDRAWAL_PASSWORD: "/profile/changewithdrawalpassword",
};

export const profilePageDictionary: {
  [key in ValueOf<typeof ProfilePathEnum>]: any; // TODO: determine its type
} = {
  [ProfilePathEnum.PROFILE]: ProfileMenuMobile,
  [ProfilePathEnum.NAME]: ProfileNamePage,
  [ProfilePathEnum.WECHAT]: ProfileWeChatPage,
  [ProfilePathEnum.BIRTHDATE]: ProfileBirthDatePage,
  [ProfilePathEnum.QQ]: ProfileQQPage,
  [ProfilePathEnum.FB]: ProfileFacebookMessengerPage,
  [ProfilePathEnum.TELEGRAM]: ProfileTelegramPage,
  [ProfilePathEnum.LINE]: ProfileLinePage,
  [ProfilePathEnum.VIBER]: ProfileViberPage,
  [ProfilePathEnum.WHATSAPP]: ProfileWhatsappPage,
  [ProfilePathEnum.EMAIL]: ProfileEmailPage,
  [ProfilePathEnum.CHANGE_EMAIL]: ProfileChangeEmail,
  [ProfilePathEnum.CHANGE_PHONE]: ProfileChangePhonePage,
  [ProfilePathEnum.PHONE]: ProfilePhonePage,
  [ProfilePathEnum.CHANGE_PASSWORD]: ProfileChangePasswordPage,
  [ProfilePathEnum.WIDHDRAWAL_PASSWORD]: ProfileWithdrawalPasswordPage,
  [ProfilePathEnum.RESET_WITHDRAWAL_PASSWORD]: ProfileResetWithdrawalPasswordPage,
  [ProfilePathEnum.CHANGE_WITHDRAWAL_PASSWORD]: ProfileChangeWithdrawalPasswordPage,
};
