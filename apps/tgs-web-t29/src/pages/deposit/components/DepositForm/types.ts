import { ReactNode } from 'react';

export type DepositFormData = {
  amount: string;
  paymentid: string;
  id: string;
  promotionid: string;
  paymentcode: string;
  type: string;
  manualBankName?: string;
}

export type FormContainerProps = {
  children: ReactNode;
  label: string;
}

export type Option = {
  iconUrl: string,
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
  DepositAccumulateRoulette = "DepositAccumulateRoulette"
}

// 自定義的 GroupCode，可依照需求新增對應類型
export enum GroupCodeEnum {
  GCash = 'GCash',
  Coinsph = 'Coinsph',
  FPS = 'FPS',
  OMNI = 'OMNI',
  ETHEREUM = 'ETHEREUM',
  ALI2ALI = 'ALI2ALI',
  PayMaya = 'PayMaya',
  TRON = 'TRON',
  MayaNative = 'Maya Native',
  GrabeNative = 'Grabe Native',
  ViettelPay = 'ViettelPay',
  Momo = 'Momo',
  TRC= 'TRC',
  Pulsa= 'Pulsa',
  EWallet= 'E-wallet',
  GcashNative = 'GcashNative',

  // 特例
  Bank= 'Bank',
}
