import React, { MemoExoticComponent, NamedExoticComponent } from "react";
import config from "@tgs-web-nx/config";
import CardPage from "@/pages/card/CardPage";
import AddCardPage from "@/pages/card/AddCardPage";
import AffiliatePage from "@/pages/affiliate/AffiliatePage";
import BettingBonusPage from "@/pages/BettingBonusPage";
import ContactUsPage from "@/pages/contactUs/ContactUsPage";
import DepositPage from "@/pages/deposit/DepositPage";
import InboxPage from "@/pages/inbox/InboxPage";
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
import { ProfilePathEnum } from "@/components/account/Profile/profilePageDictionary";
import AuthDialogLayout from "@/layouts/AuthDialogLayout";
import JoinLobbyGamePage from "@/pages/joinLobbyGame/JoinLobbyGamePage";
import JoinGamePage from "@/pages/joinGame/JoinGamePage";
import VipLayout from "@/layouts/VipLayout";

const AccountPage = React.lazy(() => import("@/pages/account/AccountPage"));

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
    component: AccountPage,
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
    layout: DefaultLayout,
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
