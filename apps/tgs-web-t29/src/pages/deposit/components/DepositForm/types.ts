import {ReactNode} from 'react';
import { TransferChannel } from "@tgs-web-nx/types";

export type DepositFormData = {
  amount: string;
  paymentid: string;
  promotionid: string;
  paymentcode: string;
  type: string;
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

export type RenderLayerConfig = {
  i18nParam: string,
  list: Option[],
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
  EWallet= 'EWallet',
  GcashNative = 'GcashNative',

  // 特例
  Bank= 'Bank',
}

export type LayerSetting = {
  layers: RenderLayerConfig[],
  channelDep: string,
  channels: TransferChannel[],
};

export type RenderLayer = (config: RenderLayerConfig, key: number) => ReactNode;

// 自定義的 Layer
export enum LayerTypeEnum {
  Default = 'default',
  BankLayer = 'bankLayer',
}

