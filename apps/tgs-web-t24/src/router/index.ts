import React from "react";
import CardPage from "@/components/pages/card/CardPage";
import AddCardPage from "@/components/pages/card/AddCardPage";
import AffiliatePage from "@/components/pages/affiliate/AffiliatePage";
import BettingBonusPage from "@/components/pages/BettingBonusPage";
import ContactUsPage from "@/components/pages/contactUs/ContactUsPage";
import DepositPage from "@/components/pages/deposit/DepositPage";
import DepositDetailsPage from "@/components/pages/deposit/DepositDetailsPage";
import DepositManualPage from "@/components/pages/deposit/DepositManualPage";
import DepositPayment from "@/components/pages/deposit/DepositPaymentPage";
import InboxPage from "@/components/pages/inbox/InboxPage";
import LoginPage from "@/components/pages/login/LoginPage";
import MainPage from "@/components/pages/home/HomePage";
import MaintenancePage from "@/components/pages/MaintenancePage";
import ProfilePage from "@/components/pages/profile/ProfilePage";
import PromotionPage from "@/components/pages/promotion/PromotionPage";
import RegisterPage from "@/components/pages/register/RegisterPage";
import ReportPage from "@/components/pages/report/ReportPage";
import TransferPage from "@/components/pages/transfer/TransferPage";
import VIPPage from "@/components/pages/vip/VipPage";
import WithdrawalPage from "@/components/pages/withdrawal/WithdrawalPage";
import WithdrawalDetailsPage from "@/components/pages/withdrawal/WithdrawalDetailsPage";
import config from "@/config/config";
import PromotionDetailPage from "@/components/pages/promotion/PromotionDetailPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPasswordPage from "@/components/pages/forgotPassword/ForgotPasswordPage";
import DialogLayout from "@/layouts/DialogLayout";
import { ProfilePathEnum } from "@/core/components/Profile/profilePageDictionary";
import AuthDialogLayout from "@/layouts/AuthDialogLayout";
import JoinLobbyGamePage from "@/components/pages/joinLobbyGame/JoinLobbyGamePage";
import JoinGamePage from "@/components/pages/joinGame/JoinGamePage";

const Mine = React.lazy(() => import("@/components/pages/account/Mine"));

export enum RouteCategoryEnum {
  HOME,
  REFER,
  PROMOTION,
  INBOX,
  MINE,
}

export interface Route {
  path: string;
  component: any;
  category: RouteCategoryEnum;
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    component: MainPage,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main",
    component: MainPage,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/main/:page",
    component: MainPage,
    category: RouteCategoryEnum.HOME,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/account",
    component: Mine,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/deposit",
    component: DepositPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/withdrawal",
    component: WithdrawalPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/betting-bonus",
    component: BettingBonusPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    component: LoginPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    category: RouteCategoryEnum.MINE,
    layout: AuthDialogLayout,
    isAnonymousAllowed: true,
  },
  // TODO:these 4 params looks like is unused?
  {
    path: "/a/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/t/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },

  {
    path: "/f/:promotionid",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/p/:playername",
    component: RegisterPage,
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
    isAnonymousAllowed: true,
  },
  {
    path: ProfilePathEnum.PROFILE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.NAME,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WECHAT,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.BIRTHDATE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.QQ,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.FB,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.TELEGRAM,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.LINE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.VIBER,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WHATSAPP,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.EMAIL,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_EMAIL,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PHONE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.PHONE,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.WIDHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.RESET_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: ProfilePathEnum.CHANGE_WITHDRAWAL_PASSWORD,
    component: ProfilePage,
    category: RouteCategoryEnum.MINE,
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
    category: RouteCategoryEnum.PROMOTION,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetailPage,
    category: RouteCategoryEnum.PROMOTION,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  //
  {
    path: "/inbox",
    component: InboxPage,
    category: RouteCategoryEnum.INBOX,
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
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/deposit/:promotionid?",
    component: DepositPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/manual/:paymentId?",
    component: DepositPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/deposit/payment/:id/:bank/:amount/:bonus?",
    component: DepositPayment,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/deposit/details",
    component: DepositDetailsPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/deposit/manual",
    component: DepositManualPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/card",
    component: CardPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/card/add",
    component: AddCardPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },
  {
    path: "/maintenance",
    component: MaintenancePage,
    category: RouteCategoryEnum.HOME,
    isAnonymousAllowed: true,
  },

  {
    path: "/report/:tab?",
    component: ReportPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  },

  // {
  //   path: "/chat/:userid?/:name?/:question?",
  //   component: CustomerServiceChat,
  // },

  {
    path: "/affiliate",
    component: AffiliatePage,
    category: RouteCategoryEnum.REFER,
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
    category: RouteCategoryEnum.MINE,
    layout: DefaultLayout,
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
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
    isAnonymousAllowed: true,
  },
  {
    path: "/joingame/:gameId/:gpCode",
    component: JoinGamePage,
    category: RouteCategoryEnum.HOME,
  },
  {
    path: "/joinlobbygame/:gameType/:gpCode",
    component: JoinLobbyGamePage,
    category: RouteCategoryEnum.HOME,
  },
];

if (!config.features.NewTransferUI) {
  routes.push({
    path: "/transfer",
    component: TransferPage,
    category: RouteCategoryEnum.MINE,
    layout: DialogLayout,
  });
}

export { routes };
