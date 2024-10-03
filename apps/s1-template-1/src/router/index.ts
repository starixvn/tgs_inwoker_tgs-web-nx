import AuthDialogLayout from "@/layouts/AuthDialogLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import DialogLayout from "@/layouts/DialogLayout";
import DialogLayoutWithoutBack from "@/layouts/DialogLayoutWithoutBack";
import IframeLayout from "@/layouts/IframeLayout";
import VipLayout from "@/layouts/VipLayout";
import BetHistoryPage from "@/pages/betHistory/BetHistoryPage";
import BettingBonusPage from "@/pages/BettingBonusPage";
import ContactUsPage from "@/pages/contactUs/ContactUsPage";
import DepositPage from "@/pages/deposit/DepositPage";
import { DepositPopupPage } from "@/pages/depositPopup/DepositPopupPage";
import DepositStatusIframe from "@/pages/depositPopup/DepositStatusIframe";
import Faq from "@/pages/Faq";
import ForgotPasswordPage from "@/pages/forgotPassword/ForgotPasswordPage";
import MainPage from "@/pages/home/HomePage";
import InboxPage from "@/pages/inbox/InboxPage";
import JoinGamePage from "@/pages/joinGame/JoinGamePage";
import JoinLobbyGamePage from "@/pages/joinLobbyGame/JoinLobbyGamePage";
import LoginPage from "@/pages/login/LoginPage";
import MaintenancePage from "@/pages/MaintenancePage";
import MakeDepositPage from "@/pages/makeDeposit/MakeDepositPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ProfilePage from "@/pages/profile/ProfilePage";
import PromotionDetailPage from "@/pages/promotion/PromotionDetailPage";
import PromotionPage from "@/pages/promotion/PromotionPage";
import RegisterPage from "@/pages/register/RegisterPage";
import ReportPage from "@/pages/report/ReportPage";
import Responsiblegaming from "@/pages/Responsiblegaming";
import TermsAndConditions from "@/pages/TermsAndConditions";
import TransferPage from "@/pages/transfer/TransferPage";
import VIPPage from "@/pages/vip/VipPage";
import WithdrawalPage from "@/pages/withdrawal/WithdrawalPage";
import config from "@tgs-web-nx/config";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import { RouteType } from "@tgs-web-nx/types";

const routes: RouteType[] = [
  {
    path: "/deposit/status/iframe",
    component: DepositStatusIframe,
    layout: IframeLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/deposit/status/",
    component: DepositStatusIframe,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  // {
  //   path: "/main/:page",
  //   component: MainPage,
  //   layout: HomeLayout,
  //   isAnonymousAllowed: true,
  // },
  // {
  //   path: "/account",
  //   component: AccountPage,
  //   layout: DefaultLayout,
  // },
  {
    path: "/makedeposit",
    component: MakeDepositPage,
    layout: DialogLayoutWithoutBack,
  },
  {
    path: "/deposit/popup",
    component: DepositPopupPage,
    layout: DialogLayoutWithoutBack,
  },
  {
    path: "/deposit",
    component: DepositPage,
    layout: DialogLayout,
  },
  {
    path: "/withdrawal",
    component: WithdrawalPage,
    layout: DialogLayout,
  },
  //TODO: remove for phase 1
  //   {
  //     path: "/wagering",
  //     component: WageringPage,
  //     layout: DialogLayout,
  //   },
  {
    path: "/betting-bonus",
    component: BettingBonusPage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: LoginPage,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  // TODO:these 4 params looks like is unused?
  {
    path: "/a/:promotionid",
    component: RegisterPage,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/p/:promotionid",
    component: RegisterPage,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: ProfilePathEnum.PROFILE,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.NAME,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WECHAT,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.BIRTHDATE,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.QQ,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.FB,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.TELEGRAM,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.LINE,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.VIBER,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WHATSAPP,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.EMAIL,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_EMAIL,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PHONE,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.PHONE,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PASSWORD,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WIDHDRAWAL_PASSWORD,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.RESET_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    layout: DialogLayout,
  },

  // {
  //   path: "/slots/:platform?/:type?",
  //   component: Slot,
  //   alert: true,
  //   navigate: true,
  // },
  {
    path: "/promotion-list",
    component: PromotionPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetailPage,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  // {
  //   path: "/message-center",
  //   component: MessageCenterPage,
  //   layout: DialogLayout,
  // },
  {
    path: "/inbox",
    component: InboxPage,
    layout: DialogLayout,
  },
  // {
  //   path: "/inbox/details/:id",
  //   component: InboxDetails,
  //   alert: true,
  //   navigate: true,
  //   screenHeight: true,
  // },
  //

  {
    path: "/deposit/:promotionid?",
    component: DepositPage,
    layout: DialogLayout,
  },
  {
    path: "/manual/:paymentId?",
    component: DepositPage,
    layout: DialogLayout,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    isAnonymousAllowed: true,
    layout: DialogLayoutWithoutBack,
  },

  {
    path: "/transactions",
    component: ReportPage,
    layout: DialogLayout,
  },

  {
    path: "/bet-history",
    component: BetHistoryPage,
    layout: DialogLayout,
  },

  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },

  //TODO: remove for phase 1
  //   {
  //     path: "/affiliate",
  //     component: AffiliatePage,
  //     layout: DialogLayout,
  //   },
  // {
  //   path: "/setting/language",
  //   component: SettingLanguage,
  //   screenHeight: true,
  // },
  // {
  //   path: "/banned",
  //   component: Banned,
  //   navigate: true,
  // },
  {
    path: "/vip",
    component: VIPPage,
    layout: VipLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/profile_vip",
    component: VIPPage,
    layout: VipLayout,
  },
  // {
  //   path: "/sports/:platform",
  //   component: CustomSportPage,
  //   alert: true,
  //   navigate: true,
  // },
  {
    path: "/support",
    component: ContactUsPage,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  //TODO: remove for phase 1
  //   {
  //     path: "/appDownload",
  //     component: AppDownloadPage,
  //     layout: DialogLayout,
  //   },
  {
    path: "/joingame/:gameId/:gpCode",
    component: JoinGamePage,
  },
  {
    path: "/joinlobbygame/:gameType/:gpCode",
    component: JoinLobbyGamePage,
  },
  {
    path: "/faq",
    component: Faq,
    isAnonymousAllowed: true,
  },
  {
    path: "/privacypolicy",
    component: PrivacyPolicy,
    isAnonymousAllowed: true,
  },
  {
    path: "/terms",
    component: TermsAndConditions,
    isAnonymousAllowed: true,
  },
  {
    path: "/responsiblegaming",
    component: Responsiblegaming,
    isAnonymousAllowed: true,
  },
  {
    path: "/providers/:gameType",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/tag/:gameType",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/casino/:gameType",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/:sports",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: TransferPage,
    layout: DialogLayout,
  });
}

export { routes };

