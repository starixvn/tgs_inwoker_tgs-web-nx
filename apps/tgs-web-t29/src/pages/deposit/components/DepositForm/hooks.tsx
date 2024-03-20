import { useWalletStore, } from "@tgs-web-nx/core";
import { useState, useEffect, useMemo, useContext} from "react";
import { groupBy } from "@tgs-web-nx/utils";
import { FilterDepositList } from "@tgs-web-nx/types";
import { Option, GroupCodeEnum } from './types';
import { DepositFormContext } from "./components/DepositFormProvider";
import { handleChangeCode, getFilterDepositList } from './utils';

/**
 * 第一層: Group
 */
export const useGroupList = () => {
  const [groupCode, setGroupCode] = useState('');
  const {wallet} = useWalletStore();
  const filterGroupList: FilterDepositList[] = useMemo(() => 
    {
      const result = wallet.depositChannelList
        .filter(row => Object.values(GroupCodeEnum).includes(row.code as GroupCodeEnum))
        .map(row => {
          return {
            code: row.code,
            channels: row.channels,
        }});
      
      // 特例
      const bankList = {
        code: GroupCodeEnum.Bank,
        channels: wallet.depositList?.find(row => row.banktype ===  GroupCodeEnum.Bank)?.channel ?? []
      };
      
      return [bankList, ...result];
    }
  , [wallet.depositChannelList, wallet.depositList]);
  
  const groupList: Option[] = filterGroupList.map(row => {
    return {
      iconUrl: `/assets/images/deposit/${row.code}.png`,
      isActive: row.code === groupCode,
      onClick: () => handleChangeCode(row.code, setGroupCode),
      children: row.code,
      code: row.code,
    }
  });

  useSelectFirst(groupList, setGroupCode);
  
  return {groupCode, groupList, filterGroupList};
}

/**
 * 最後一層: Channel
 * @param list 上一層的 FilterDepositList[]
 * @param code 上一層的 code
 */
export const useChannelList = (list: FilterDepositList[], code: string) => {
  const [selectedID, setSelectedID] = useState('');
  const filterChannelList = getFilterDepositList(list, code);
  const channelList: Option[] = filterChannelList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.id === selectedID,
      onClick: () => handleChangeCode(row.id, setSelectedID),
      children: row.channelname,
      code: row.id,
    }
  });
  const currentChannel = filterChannelList.find(row => row.id === selectedID);
  const {formData, setFormData} = useContext(DepositFormContext);
  const extended = currentChannel?.extended;
  const extendedKeys = extended ? Object.keys(extended) : [];
  const hasExtended = extended && extendedKeys.length > 0;

  useEffect(() => {
    setFormData({
      ...formData,
      paymentcode: currentChannel?.paymentcode ?? '',
      paymentid: currentChannel?.paymentid ?? '',
      id: currentChannel?.id ?? '',
      type: currentChannel?.banktype.toLowerCase() ?? '',
      minAmount: currentChannel?.transferlimit.from ?? 0,
      maxAmount: currentChannel?.transferlimit.to ?? 0,
      phone: extended?.phone ?? '',
      name: extended?.eMoneyName ? extended?.eMoneyName ?? '' : extended?.name ?? '',
    })
  }, [currentChannel?.id])

  useSelectFirst(channelList, setSelectedID, [code]);
    
  return {channelList, currentChannel, hasExtended, extended};
}


/**
 * 客製化 中間層 金流商
 * @param list 上一層的 FilterDepositList[]
 * @param code 上一層的 code
 */
export const useProviderList = (list: FilterDepositList[], code: string) => {
  const [providerCode, setProviderCode] = useState('');
  const filterProviderList: FilterDepositList[] = useMemo(() => {
    const getChannelList = getFilterDepositList(list, code);
    const groupByObject = groupBy(getChannelList, row => row.paymentcode);
    
    return Object.keys(groupByObject).map(row => {
      return {
        code: row,
        channels: groupByObject[row] ?? []
      }
    })
    }
  , [list])

  const providerList: Option[] = filterProviderList.map(row => {
    return {
      iconUrl: "/assets/images/deposit/momo.webp",
      isActive: row.code === providerCode,
      onClick: () => handleChangeCode(row.code, setProviderCode),
      children: row.code,
      code: row.code,
    }
  });

  useSelectFirst(providerList, setProviderCode, [code, providerList.length]);
  
  return {
    providerList,
    filterProviderList,
    providerCode,
  }
}

/**
 * 預設選第一個選項
 * @param list 選項陣列
 * @param setCode setState 方法
 * @param depArr dependency array
 */
const useSelectFirst = (list: Option[], setCode: (code: string) => void, depArr: unknown[] = []) => {
  useEffect(()=> {
    if(list.length > 0) {
      setCode(list[0].code);
    }
  }, depArr)
};
