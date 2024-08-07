import React from "react";
import config from "@tgs-web-nx/config";
import { RouteType } from "@tgs-web-nx/types";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import AffiliatePage from "@/pages/affiliate/AffiliatePage";
import ContactUsPage from "@/pages/contactUs/ContactUsPage";
import DepositPage from "@/pages/deposit/DepositPage";
import MessageCenterPage from "@/pages/messageCenter/MessageCenterPage";
import LoginPage from "@/pages/login/LoginPage";
import MainPage from "@/pages/home/HomePage";
import MaintenancePage from "@/pages/maintenance/MaintenancePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import PromotionPage from "@/pages/promotion/PromotionPage";
import RegisterPage from "@/pages/register/RegisterPage";
import ReportPage from "@/pages/report/ReportPage";
import TransferPage from "@/pages/transfer/TransferPage";
import VIPPage from "@/pages/vip/VipPage";
import WithdrawalPage from "@/pages/withdrawal/WithdrawalPage";
import WageringPage from "@/pages/wagering/WageringPage";
import PromotionDetailPage from "@/pages/promotion/PromotionDetailPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordPage from "@/pages/forgotPassword/ForgotPasswordPage";
import DialogLayout from "@/layouts/DialogLayout";
import AuthDialogLayout from "@/layouts/AuthDialogLayout";
import JoinLobbyGamePage from "@/pages/joinLobbyGame/JoinLobbyGamePage";
import JoinGamePage from "@/pages/joinGame/JoinGamePage";
import AppDownloadPage from "@/pages/download/DownloadPage";
import HomeLayout from "@/layouts/HomeLayout";
import VipLayout from "@/layouts/VipLayout";
import BannedLayout from "@/layouts/BannedLayout";
import InboxPage from "@/pages/inbox/InboxPage";
import Faq from "@/pages/Faq";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Responsiblegaming from "@/pages/Responsiblegaming";
import MaintenanceLayout from "@/layouts/MaintenanceLayout";
import BannedPage from "@/pages/banned/BannedPage";
import AgentPgae from "@/pages/agent/AgentPage";
import AgentInfoPgae from "@/pages/agent/components/AgentInfo/MobilePage";
import AgentPlayerListPgae from "@/pages/agent/components/AgentPlayerList/MobilePage";
import AgentListPgae from "@/pages/agent/components/AgentList/MobilePage";
import WinlossReport from "@/pages/agent/components/WinlossReport/MobilePage";
import ProfitShareReport from "@/pages/agent/components/ProfitShareReport/MobilePage";
import ContributionPage from "@/pages/agent/components/Contribution/MobilePage";

const AccountPage = React.lazy(() => import("@/pages/account/AccountPage"));

const routes: RouteType[] = [
  {
    path: "/",
    component: MainPage,
    layout: HomeLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main",
    component: MainPage,
    layout: HomeLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main/:gameType",
    component: MainPage,
    layout: HomeLayout,
    isAnonymousAllowed: true,
  },
  // {
  //   path: "/main/:page",
  //   component: MainPage,
  //   layout: HomeLayout,
  //   isAnonymousAllowed: true,
  // },
  {
    path: "/account",
    component: AccountPage,
    layout: DialogLayout,
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
  {
    path: "/wagering",
    component: WageringPage,
    layout: DialogLayout,
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
    path: ProfilePathEnum.ZALO,
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
    layout: DialogLayout,
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
    layout: MaintenanceLayout,
  },

  {
    path: "/report/:tab?",
    component: ReportPage,
    layout: DialogLayout,
  },

  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },

  {
    path: "/affiliate",
    component: AffiliatePage,
    layout: DialogLayout,
  },
  // {
  //   path: "/setting/language",
  //   component: SettingLanguage,
  //   screenHeight: true,
  // },
  {
    path: "/banned",
    component: BannedPage,
    isAnonymousAllowed: true,
    layout: BannedLayout,
  },
  {
    path: "/vip",
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
  {
    path: "/appDownload",
    component: AppDownloadPage,
    layout: DialogLayout,
  },
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
    path: "/agent",
    component: AgentPgae,
    layout: DialogLayout,
  },
  {
    path: "/agent/agentInfo",
    component: AgentInfoPgae,
    layout: DialogLayout,
  },
  {
    path: "/agent/playerList",
    component: AgentPlayerListPgae,
    layout: DialogLayout,
  },
  {
    path: "/agent/agentList",
    component: AgentListPgae,
    layout: DialogLayout,
  },
  {
    path: "/agent/winlossReport",
    component: WinlossReport,
    layout: DialogLayout,
  },
  {
    path: "/agent/profitShareReport",
    component: ProfitShareReport,
    layout: DialogLayout,
  },
  {
    path: "/agent/contribution",
    component: ContributionPage,
    layout: DialogLayout,
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
