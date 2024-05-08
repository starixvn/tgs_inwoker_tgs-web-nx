import { useWalletStore, useAccountStore} from "@tgs-web-nx/core";
import { useState, useEffect, useMemo, useContext} from "react";
import { groupBy, i18n } from '@tgs-web-nx/utils';
import { FilterDepositList } from '@tgs-web-nx/types';
import { useNotifications } from '@tgs-web-nx/core/features';
import { Option, GroupCodeEnum, MovnCodeEnum } from './types';
import { DepositFormContext } from "./components/DepositFormProvider";
import { handleChangeCode, getFilterDepositList } from './utils';

const clearedFormData = {
  eMoneyName: '',
  files: null,
  amount: '',
  account: '',
  name: '',
  phone: '',
  address: '',
  promotionid: '',
}

/**
 * 第一層: Group
 */
export const useGroupList = () => {
  const [groupCode, setGroupCode] = useState('');
  const {wallet: {depositChannelList, depositList}} = useWalletStore();
  const filterGroupList: FilterDepositList[] = useMemo(() =>
    {
      const result = depositChannelList
        .filter(row => Object.values(GroupCodeEnum).includes(row.code as GroupCodeEnum))
        .map(row => {
          return {
            code: row.code,
            channels: row.channels.filter(row => row.banktype !== GroupCodeEnum.Bank),
        }});

      // 特例
      const bankList = {
        code: GroupCodeEnum.Bank,
        channels: depositList?.find(row => row.banktype ===  GroupCodeEnum.Bank)?.channel ?? []
      };

      return [bankList, ...result];
    }
  , [depositChannelList, depositList]);
    
  const groupList: Option[] = filterGroupList
    .filter(row => row.channels.length > 0)
    .map(row => {
      return {
        iconUrl: `/assets/images/deposit/${row.code.toLocaleLowerCase()}.webp`,
        isActive: row.code === groupCode,
        onClick: () => handleChangeCode(row.code, setGroupCode),
        children: row.code,
        code: row.code,
      }
  });

  useSelectFirst(groupList, setGroupCode, [groupList.length]);

  return {groupCode, groupList, filterGroupList};
}

/**
 * 第一層: 網關 直連 掃碼
 * @alias MOVN 客製化
 */
export const useMOVNList = () => {
  const [movnCode, setMovnCode] = useState('');
  const {wallet: {depositData}} = useWalletStore();
  const filterMovnList: FilterDepositList[] = useMemo(() =>
    {
      return Object.values(MovnCodeEnum)
        .map(key => {
          return {
            code: key,
            channels: depositData?.filter(row => row.channelname.includes(`${key}_`)) ?? [],
        }});

    }
  , [depositData]);
    
  const movnList: Option[] = filterMovnList
    .filter(row => row.channels.length > 0)
    .map(row => {
      return {
        iconUrl: `/assets/images/deposit/${row.code.toLocaleLowerCase()}.webp`,
        isActive: row.code === movnCode,
        onClick: () => handleChangeCode(row.code, setMovnCode),
        children: i18n.t(`MOVN2.${row.code}`),
        code: row.code,
      }
    });

  useSelectFirst(movnList, setMovnCode, [movnList.length]);

  return {
    filterMovnList,
    movnCode,
    movnList,
  }
}

/**
 * 最後一層: Channel
 * @param list 上一層的 FilterDepositList[]
 * @param code 上一層的 code
 */
export const useChannelList = (list: FilterDepositList[], code: string) => {
  const { account } = useAccountStore();
  const [selectedID, setSelectedID] = useState('');
  const filterChannelList = getFilterDepositList(list, code);
  const channelList: Option[] = filterChannelList.map(row => {
    return {
      isActive: row.id === selectedID,
      onClick: () => handleChangeCode(row.id, setSelectedID),
      children: MovnCodeEnum[code as MovnCodeEnum] ? row.channelname.replace(`${code}_`, "") : row.channelname,
      code: row.id,
    }
  });
  const currentChannel = filterChannelList.find(row => row.id === selectedID);
  const isManual = currentChannel?.paymentcode === 'Manual';
  const {formData, setFormData} = useContext(DepositFormContext);
  const extended = currentChannel?.extended;

  useEffect(() => {
    setFormData({
      ...formData,
      paymentcode: currentChannel?.paymentcode ?? '',
      paymentid: currentChannel?.paymentid ?? '',
      id: currentChannel?.id ?? '',
      type: currentChannel?.banktype.toLowerCase() ?? '',
      minAmount: currentChannel?.transferlimit.from ?? 0,
      maxAmount: currentChannel?.transferlimit.to ?? 0,
      realname: account.info.member_username,
      ...clearedFormData,
    })
  }, [currentChannel?.id])

  useSelectFirst(channelList, setSelectedID, [code, channelList.length]);

  return {channelList, currentChannel, extended, isManual};
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

/**
 * 上傳檔案成功後，開啟存款成功 dialog
 */
export const useUploadFile = () => {
  const [uploadKey, setUploadKey] = useState(0);
  const {doUploadDepositProof} = useWalletStore();
  const [isPending, setIsPending] = useState(false);
  const {alert} = useNotifications();
  const {formData, setFormData} = useContext(DepositFormContext);
  const handleClearFormData = () => {
    setFormData({
      ...formData,
      ...clearedFormData,
    })
    setUploadKey(prevKey => prevKey + 1);
  }

  const handleUploadFile = (file: FileList | null, res: any ) => {
    setIsPending(true);
    if(file && res?.IsSuccess) {
      doUploadDepositProof(res.data, file[0])
        .then(( res: any)=> {
          if(res?.IsSuccess) {
            setIsPending(false);
            handleClearFormData();
            alert("", i18n.t("deposit.completeDeposit"));
          }

          if(!res?.IsSuccess) {
            alert("", res.data.errmsg);
            setIsPending(false);
          }
        })
    }

    if(!res?.IsSuccess) {
      alert("", res.data.errmsg);
      setIsPending(false);
    }
  }

  return {handleUploadFile, isPending, uploadKey};
}

/**
 * 第三方存款 dialog
 */
export const useThirdPartyDeposit = () => {
  const {performDeposit} = useWalletStore();
  const {alert} = useNotifications();
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [url, setUrl] = useState(undefined);
  const {formData, setFormData} = useContext(DepositFormContext);
  const handleClearFormData = () => {
    setFormData({
      ...formData,
      ...clearedFormData,
    })
  }
  const handleOnClose = () => {
    setIsDialogOpen(false);
  } 
  
  
  const handleOpenPopupUrl = () => {
    if(url) {
      window.open(url)
      setIsDialogOpen(false);
    }
  }

  const handleOnPending = (res: any) => {
    setIsPending(true);
    if(res?.IsSuccess) {
      setIsPending(false);
      handleClearFormData();
      setIsDialogOpen(true);
      if(res?.data.paymenturl) {
        setUrl(res?.data.paymenturl)
      }
    }

    if(!res?.IsSuccess) {
      alert("", res.data.errmsg);
      setIsPending(false);
    }
  }  

  const handlePerformDeposit = () => {
    const {amount, id, promotionid, paymentcode, type} = formData;
    performDeposit(amount, id, promotionid, paymentcode, type)
      .then((res) => {
        handleOnPending(res);
      })
  }

  return {handlePerformDeposit, isPending, handleOpenPopupUrl, handleOnClose, isDialogOpen};
}
