import { ValueOf } from "@tgs-web-nx/types";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import ProfileMenuMobile from "@/pages/profile/components/ProfileMenu/ProfileMenuMobile";
import ProfileBirthDatePage from "@/components/account/Profile/ProfileBirthDate";
import ProfileChangeEmail from "@/components/account/Profile/ProfileChangeEmail";
import ProfileChangePasswordPage from "@/components/account/Profile/ProfileChangePassword";
import ProfileChangePhonePage from "@/components/account/Profile/ProfileChangePhone";
import ProfileChangeWithdrawalPasswordPage from "@/components/account/Profile/ProfileChangeWithdrawalPassword";
import ProfileEmailPage from "@/components/account/Profile/ProfileEmail";
import ProfileFacebookMessengerPage from "@/components/account/Profile/ProfileFacebookMessenger";
import ProfileLinePage from "@/components/account/Profile/ProfileLine";
import ProfileNamePage from "@/components/account/Profile/ProfileName";
import ProfilePhonePage from "@/components/account/Profile/ProfilePhone";
import ProfileQQPage from "@/components/account/Profile/ProfileQQ";
import ProfileResetWithdrawalPasswordPage from "@/components/account/Profile/ProfileResetWithdrawalPassword";
import ProfileTelegramPage from "@/components/account/Profile/ProfileTelegram";
import ProfileViberPage from "@/components/account/Profile/ProfileViber";
import ProfileWithdrawalPasswordPage from "@/components/account/Profile/ProfileWIthdrawalPassword";
import ProfileWeChatPage from "@/components/account/Profile/ProfileWeChat";
import ProfileWhatsappPage from "@/components/account/Profile/ProfileWhatsapp";
import ProfileZALOPage from "@/components/account/Profile/ProfileZALO";

export const profilePageDictionary: {
  [key in ValueOf<typeof ProfilePathEnum>]: any; // TODO: determine its type
} = {
  [ProfilePathEnum.PROFILE]: ProfileMenuMobile,
  [ProfilePathEnum.NAME]: ProfileNamePage,
  [ProfilePathEnum.WECHAT]: ProfileWeChatPage,
  [ProfilePathEnum.ZALO]: ProfileZALOPage,
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
