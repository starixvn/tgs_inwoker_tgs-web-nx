import { useWalletStore } from "@tgs-web-nx/core";
import { useState, useEffect, useMemo } from "react";
import { walletAction } from "@tgs-web-nx/core";

type DepositFormData = {
  amount: string;
  banktype: string;
  paymentid: string;
  promotionid: string
  paymentcode: string
  type: string
}

export const useDepositForm = () => {
  const [channelCode, setChannelCode] = useState('');
  const [channelId, setChannelId] = useState('');
  const [amount, setAmount] = useState('');
  const { wallet, performDeposit } = useWalletStore();
  const depositChannelList = useMemo(() => wallet.depositChannelList ?? [], [wallet.depositChannelList]);
  const filterList = useMemo(() => depositChannelList.find(row => row.channelCode === channelCode)?.channels ?? [], [depositChannelList, channelCode]);
  const currentChannel = filterList.find(row => row.id === channelId);
  
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

  const handleOnChangeChannelCode = (code: string) => {
    setChannelCode(code);
  };

  const handleOnChangeChannelId = (id: string) => {
    setChannelId(id);
  };

  useEffect(() => {
    if(depositChannelList.length > 0) {
      setChannelCode(depositChannelList[0].channelCode)
    }
  }, [depositChannelList])
  
  useEffect(()=> {
    if(filterList.length > 0) {
      setChannelId(filterList[0].id)
    }
  }, [filterList])

  return {
    channelCode,
    channelId,
    amount,
    handleOnChangeAmount,
    handleOnChangeChannelCode,
    handleOnChangeChannelId,
    handleOnSubmit,
    depositChannelList,
    filterList,
    transferlimit
  }
}