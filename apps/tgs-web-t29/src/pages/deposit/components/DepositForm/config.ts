import { GroupCodeEnum, LayerTypeEnum } from "./types"

export const groupCodeConfig: Record<GroupCodeEnum, LayerTypeEnum> = {
  [GroupCodeEnum.GCash]: LayerTypeEnum.Default,
  [GroupCodeEnum.Coinsph]: LayerTypeEnum.Default,
  [GroupCodeEnum.FPS]: LayerTypeEnum.Default,
  [GroupCodeEnum.OMNI]: LayerTypeEnum.Default,
  [GroupCodeEnum.ETHEREUM]: LayerTypeEnum.Default,
  [GroupCodeEnum.ALI2ALI]: LayerTypeEnum.Default,
  [GroupCodeEnum.PayMaya]: LayerTypeEnum.Default,
  [GroupCodeEnum.TRON]: LayerTypeEnum.Default,
  [GroupCodeEnum.MayaNative]: LayerTypeEnum.Default,
  [GroupCodeEnum.GrabeNative]: LayerTypeEnum.Default,
  [GroupCodeEnum.ViettelPay]: LayerTypeEnum.Default,
  [GroupCodeEnum.Momo]: LayerTypeEnum.Default,
  [GroupCodeEnum.TRC]: LayerTypeEnum.Default,
  [GroupCodeEnum.Pulsa]: LayerTypeEnum.Default,
  [GroupCodeEnum.EWallet]: LayerTypeEnum.Default,
  [GroupCodeEnum.GcashNative]: LayerTypeEnum.Default,
  [GroupCodeEnum.Bank]: LayerTypeEnum.BankLayer,
}

export const depositPromotionMap = {
  "FirstDeposit": "FirstDeposit",
  "DailySecondDeposit": "DailySecondDeposit",
  "DailyFirstDeposit": "DailyFirstDeposit",
  "DepositReward": "DepositReward",
  "DepositAccumulateRoulette": "DepositAccumulateRoulette"
}