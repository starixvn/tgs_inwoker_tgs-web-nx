import React from "react";
import config from "@tgs-web-nx/config";
import { RouteType } from "@tgs-web-nx/types";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import CardPage from "@/pages/card/CardPage";
import AddCardPage from "@/pages/card/AddCardPage";
import AffiliatePage from "@/pages/affiliate/AffiliatePage";
import BettingBonusPage from "@/pages/BettingBonusPage";
import ContactUsPage from "@/pages/contactUs/ContactUsPage";
import DepositPage from "@/pages/deposit/DepositPage";
import MessageCenterPage from "@/pages/messageCenter/MessageCenterPage";
import LoginPage from "@/pages/login/LoginPage";
import MainPage from "@/pages/home/HomePage";
import MaintenancePage from "@/pages/MaintenancePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import PromotionPage from "@/pages/promotion/PromotionPage";
import RegisterPage from "@/pages/register/RegisterPage";
import ReportPage from "@/pages/report/ReportPage";
import TransferPage from "@/pages/transfer/TransferPage";
import VIPPage from "@/pages/vip/VipPage";
import WithdrawalPage from "@/pages/withdrawal/WithdrawalPage";
import WithdrawalDetailsPage from "@/pages/withdrawal/WithdrawalDetailsPage";
import PromotionDetailPage from "@/pages/promotion/PromotionDetailPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordPage from "@/pages/forgotPassword/ForgotPasswordPage";
import DialogLayout from "@/layouts/DialogLayout";
import JoinLobbyGamePage from "@/pages/joinLobbyGame/JoinLobbyGamePage";
import JoinGamePage from "@/pages/joinGame/JoinGamePage";

const AccountPage = React.lazy(() => import("@/pages/account/AccountPage"));

const routes: RouteType[] = [
  {
    path: "/",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main/:page",
    component: MainPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
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
    path: "/betting-bonus",
    component: BettingBonusPage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: LoginPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  // TODO:these 4 params looks like is unused?
  {
    path: "/a/:promotionid",
    component: RegisterPage,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/t/:promotionid",
    component: RegisterPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },

  {
    path: "/f/:promotionid",
    component: RegisterPage,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/p/:playername",
    component: RegisterPage,
    layout: DefaultLayout,
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
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetailPage,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  //
  {
    path: "/inbox",
    component: MessageCenterPage,
    layout: DialogLayout,
  },
  // {
  //   path: "/memo",
  //   component: memo,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/inbox/details/:id",
  //   component: InboxDetails,
  //   alert: true,
  //   navigate: true,
  //   screenHeight: true,
  // },
  //
  // TODO:it looks like /withdrawal/details is not used?
  {
    path: "/withdrawal/details",
    component: WithdrawalDetailsPage,
    layout: DialogLayout,
  },
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
    path: "/card",
    component: CardPage,
    layout: DialogLayout,
  },
  {
    path: "/card/add",
    component: AddCardPage,
    layout: DialogLayout,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    isAnonymousAllowed: true,
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
  // {
  //   path: "/banned",
  //   component: Banned,
  //   navigate: true,
  // },
  {
    path: "/vip",
    component: VIPPage,
    layout: DialogLayout,
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
    path: "/joingame/:gameId/:gpCode",
    component: JoinGamePage,
  },
  {
    path: "/joinlobbygame/:gameType/:gpCode",
    component: JoinLobbyGamePage,
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
