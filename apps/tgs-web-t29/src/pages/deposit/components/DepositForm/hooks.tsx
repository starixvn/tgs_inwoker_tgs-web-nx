import { useWalletStore, walletAction } from "@tgs-web-nx/core";
import { useState, useEffect, useMemo } from "react";
import { groupBy } from "@tgs-web-nx/utils";
import { FilterDepositList } from "@tgs-web-nx/types";
import { useGeneralStore } from "@tgs-web-nx/core";
import { SelectChangeEvent } from "@mui/material";
import { groupCodeConfig } from "./config";
import { RenderLayerConfig, DepositFormData, Option } from "./types";
import {LayerTypeEnum, GroupCodeEnum, LayerSetting, DepositPromotionEnum} from './types';

export const useDepositForm = () => {
  const [groupCode, setGroupCode] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [providerCode, setProviderCode] = useState('');
  const [amount, setAmount] = useState('');
  const [promotion, setPromotion] = useState('');

  const {wallet, performDeposit} = useWalletStore();
  const {general: { promotionList }} = useGeneralStore();
  
  // 第一層 Group
  const filterGroupList: FilterDepositList[] = useMemo(() => 
    {
      const result = wallet.depositChannelList
        .filter(row => groupCodeConfig[row.code as GroupCodeEnum])
        .map(row => {
          return {
            code: row.code,
            channels: row.channels,
          }
        })
        ;
      
      // 特例
      const bankList = {
        code: GroupCodeEnum.Bank,
        channels: wallet.depositList?.find(row => row.banktype ===  GroupCodeEnum.Bank)?.channel ?? []
      };
    
      console.log(wallet.depositList);
      
      return [bankList, ...result];
    }
  , [wallet.depositChannelList, wallet.depositList]);
  
  const groupList: Option[] = filterGroupList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.png",
      isActive: row.code === groupCode,
      onClick: () => handleChangeCode(row.code, setGroupCode),
      children: row.code,
      code: row.code,
    }
  });

  // 預設 最後一層 Channel
  const filterDefaultChannelList = getFilterDepositList(filterGroupList, groupCode);
  const defaultChannelList: Option[] = filterDefaultChannelList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.id === selectedID,
      onClick: () => handleChangeCode(row.id, setSelectedID),
      children: row.channelname,
      code: row.id,
    }
  });

  
  /**
   * BankLayer 特例 
   * ----- START -----
   */
  const filterProviderList = useMemo(() => {
      const groupByObject = groupBy(filterDefaultChannelList, row => row.paymentcode);
      
      return Object.keys(groupByObject).map(row => {
        return {
          code: row,
          channels: groupByObject[row] ?? []
        }
      })
    }
  , [filterDefaultChannelList])

  const providerList: Option[] = filterProviderList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.code === providerCode,
      onClick: () => handleChangeCode(row.code, setProviderCode),
      children: row.code,
      code: row.code,
    }
  });

  const bankChannelList = getFilterDepositList(filterProviderList, providerCode).map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.id === selectedID,
      onClick: () => handleChangeCode(row.id, setSelectedID),
      children: row.channelname,
      code: row.id,
    }
  });

  /**
   * BankLayer 特例 
   * ----- END -----
   */

  const groupLayer: RenderLayerConfig = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: groupList,
  };

  const channelLayer: RenderLayerConfig = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: defaultChannelList,
  };

  const defaultLayers: RenderLayerConfig[] = [groupLayer, channelLayer];
  const bankLayers: RenderLayerConfig[] = [
    groupLayer,
    {
      i18nParam: "depositAndWithdrawalStatus.depositMode",
      list: providerList,
    },
    {
      ...channelLayer,
      list: bankChannelList,
    },
  ];

  // 對應顯示
  const mapLayers: Record<LayerTypeEnum, LayerSetting> = {
    [LayerTypeEnum.Default]: {
      layers: defaultLayers,
      channelDep: groupCode,
      channels: filterDefaultChannelList,
    },
    [LayerTypeEnum.BankLayer]: {
      layers: bankLayers,
      channelDep: providerCode,
      channels: filterProviderList.find(row => row.code === providerCode)?.channels ?? [],
    },
  }

  const currentLayers = mapLayers[groupCodeConfig[groupCode as  GroupCodeEnum]] ?? mapLayers[LayerTypeEnum.Default];
  const layers: RenderLayerConfig[] = currentLayers?.layers ?? [];
  const layersLastIndex = layers.length - 1;
  const channelDep = currentLayers?.channelDep ?? '';
  const mapChannelList = layers[layersLastIndex]?.list ?? defaultChannelList
  
  // 最後選中的渠道
  const currentChannel = currentLayers?.channels.find(row => row.id === selectedID);
  const transferlimit = currentChannel?.transferlimit;
  const depositFormData: DepositFormData = {
    amount,
    paymentcode: currentChannel?.paymentcode ?? '',
    paymentid: currentChannel?.paymentid ?? '',
    promotionid: promotion,
    type: currentChannel?.banktype ?? '',
  };

  console.log(currentChannel);
  

  const filterPromotionList = promotionList.items.filter((row) => {
    if(row.promotionType === DepositPromotionEnum.DepositReward) {
      return Number(amount) >= row.campaignDetail.bonusAmountLimit
    }
    
    return !!DepositPromotionEnum[row.promotionType as DepositPromotionEnum]
  });
                  
  // 預設選第一個
  useSelectFirst(groupList, setGroupCode);
  useSelectFirst(providerList, setProviderCode, [groupCode, groupList.length]);
  useSelectFirst(mapChannelList, setSelectedID, [channelDep]);

  const handleOnSubmit = () => {
    const {amount, paymentid, promotionid, paymentcode, type} = depositFormData;
    performDeposit(Number(amount), paymentid, promotionid, paymentcode, type);
  }

  const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleOnSelectPromotion = (e: SelectChangeEvent<any>) => {
    setPromotion(e.target.value);
  }

  return {
    amount,
    promotion,
    handleOnChangeAmount,
    handleOnSelectPromotion,
    handleOnSubmit,
    transferlimit,
    layers,
    filterPromotionList,
  }
}

// utils
const getFilterDepositList = (list: FilterDepositList[], code: string) => {
  return list.find(row => row.code === code)?.channels ?? [];
};

const useSelectFirst = (list: Option[], setCode: (code: string) => void, dep: unknown[] = []) => {
  useEffect(()=> {
    if(list.length > 0) {
      setCode(list[0].code);
    }
  }, dep)
};

const handleChangeCode = (code: string, setCode: (code: string) => void, callback?: () => void) => {
  setCode(code);

  if(callback) {
    callback();
  }
};