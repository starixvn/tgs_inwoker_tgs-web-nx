import { useWalletStore, walletAction } from "@tgs-web-nx/core";
import { useState, useEffect, useMemo } from "react";
import { groupBy } from "@tgs-web-nx/utils";
import {groupCode} from "./config";
import { RenderLayer, RenderLayerConfig, DepositFormData } from "./types";


export const useDepositForm = () => {
  const [channelCode, setChannelCode] = useState('');
  const [channelId, setChannelId] = useState('');
  const [providerCode, setProviderCode] = useState('');

  const [amount, setAmount] = useState('');
  const { wallet, performDeposit } = useWalletStore();

  const filterGroupList = useMemo(() => 
    {
      const result = wallet.depositChannelList.filter((row) => groupCode[row.channelCode]);
      const bankList = {
        channelCode: groupCode.Bank,
        channels: wallet.depositList?.find(row => row.banktype === groupCode.Bank)?.channel ?? []
      };
      
      return [bankList, ...result];
    }
  , [wallet.depositChannelList, wallet.depositList]);

  const filterChannelList = useMemo(() => filterGroupList.find(row => row.channelCode === channelCode)?.channels ?? [], [filterGroupList, channelCode]);
  
  console.log(groupBy(filterChannelList, row => row.channelcode));
  
  const providerList = useMemo(() => {
    
  }, [channelCode])
  
  const currentChannel = filterChannelList.find(row => row.id === channelId);
  
  const transferlimit = currentChannel?.transferlimit;
  const depositFormData: DepositFormData = {
    amount,
    banktype: currentChannel?.banktype ?? '',
    paymentcode: currentChannel?.paymentcode ?? '',
    paymentid: currentChannel?.paymentid ?? '',
    promotionid: '',
    type: '',
  };

  const handleOnSubmit = () => {
    const {amount, paymentid, promotionid, paymentcode, type} = depositFormData;
    performDeposit(Number(amount), paymentid, promotionid, paymentcode, type);
  }

  const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleOnChangeProviderCode = (code: string) => {

  }

  const handleOnChangeChannelCode = (code: string) => {
    setChannelCode(code);
  };

  const handleOnChangeChannelId = (id: string) => {
    setChannelId(id);
  };

  const groupList = filterGroupList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.png",
      isActive: row.channelCode === channelCode,
      onClick: handleOnChangeChannelCode,
      children: row.channelCode,
      code: row.channelCode,
    }
  });

  const channelList = filterChannelList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.id === channelId,
      onClick: handleOnChangeChannelId,
      children: row.channelname,
      code: row.id,
    }
  });

  useEffect(() => {
    if(filterGroupList.length > 0) {
      setChannelCode(filterGroupList[0].channelCode)
    }
  }, [filterGroupList])
  
  useEffect(()=> {
    if(filterChannelList.length > 0) {
      setChannelId(filterChannelList[0].id)
    }
  }, [filterChannelList])

  const [isShowGroupLayer, isShowProviderLayer, isShowChannelLayer] = [!!channelCode, !!providerCode, !!channelId]
  
  console.log(filterChannelList);
    

  const layers: RenderLayerConfig[] = [
    {
      isVisible: isShowProviderLayer,
      i18nParam: "depositAndWithdrawalStatus.depositMode",
      list: groupList,
    },
    {
      isVisible: isShowGroupLayer,
      i18nParam: "depositAndWithdrawalStatus.depositMode",
      list: groupList,
    },
    {
      isVisible: isShowChannelLayer,
      i18nParam: "depositAndWithdrawalStatus.channel",
      list: channelList,
    },
  ]
  return {
    channelCode,
    channelId,
    amount,
    handleOnChangeAmount,
    handleOnChangeChannelCode,
    handleOnChangeChannelId,
    handleOnSubmit,
    transferlimit,
    layers,
  }
}