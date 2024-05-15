import { ReactNode } from 'react';

export type DepositFormData = {
  amount: string;
  paymentid: string;
  id: string;
  promotionid: string;
  paymentcode: string;
  type: string;
  account: string;
  name: string;
  eMoneyName: string;
  files: FileList | null;
  phone: string;
  realname: string;
  address: string;
}

export type FormContainerProps = {
  children: ReactNode;
  label: string;
}

export type Option = {
  iconUrl?: string,
  isActive: boolean,
  onClick: (value: string) => void,
  children: ReactNode | string,
  code: string,
}

export enum DepositPromotionEnum {
  FirstDeposit = "FirstDeposit",
  DailySecondDeposit = "DailySecondDeposit",
  DailyFirstDeposit = "DailyFirstDeposit",
  DepositReward = "DepositReward",
  DepositAccumulateRoulette = "DepositAccumulateRoulette",
  AccountFirstDeposit = "AccountFirstDeposit",
}

// 自定義的 GroupCode，可依照需求新增對應類型
// 前台會依照此順序顯示
export enum GroupCodeEnum {
  GCash = 'GCash',
  PayMaya = 'PayMaya',
  Bank= 'Bank',
  Grabpay = 'Grabpay',
  Coinsph = 'Coinsph',
  FPS = 'FPS',
  OMNI = 'OMNI',
  ETHEREUM = 'ETHEREUM',
  ALI2ALI = 'ALI2ALI',
  TRON = 'TRON',
  ViettelPay = 'ViettelPay',
  Momo = 'Momo',
  TRC= 'TRC',
  Pulsa= 'Pulsa',
  EWallet= 'E-wallet',
  GcashNative = 'Gcash Native',
  MayaNative = 'Maya Native',
  GrabeNative = 'Grabe Native',
}

// 自定義的 MovnCode
export enum MovnCodeEnum {
  NET = 'NET', // 網關
  QR = 'QR', // 掃碼
  DR = 'DR', // 直聯
  MOMO = 'MOMO', // MOMO
  VP = 'VP', // ViettelPay
  USDT = 'USDT', // USDT
}
