import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { useChannelList, useProviderList } from "../../hooks";
import { Cards, DepositAmountInput, DepositPromotion, Upload, DepositSubmitButton, DepositFormContext } from "../../components";
import { BankExtended } from "../Extended";
import { LayoutProps } from "./index";
import {groupCodeConfig, GroupCodeEnum} from '@/pages/deposit/components/DepositForm/types';


/**
 * 客製化 金流商 UI
 */
export const BankLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {providerList, filterProviderList, providerCode} = useProviderList(filterGroupList, groupCode);
  const {channelList, currentChannel, extended, hasExtended, isManual} = useChannelList(filterProviderList, providerCode);
  const {performDeposit, doBankDeposit, doUploadDepositProof} = useWalletStore();
  const {formData} = useContext(DepositFormContext);
  const bankType = groupCode ? groupCodeConfig[groupCode as GroupCodeEnum].bankType : null;
  const isShowProviderCards = providerList.length > 1;

  const channelProps = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  const providerProps = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: providerList,
  };

  const [ProviderCards, ChannelCards] = [Cards, Cards];


  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, paymentcode, type, name, account} = formData;

    // 預設銀行存款
    if(!isManual) {
      performDeposit(amount, id, promotionid, paymentcode, type);
      return;
    }

    // 手動存款
    doBankDeposit(name, account, amount, id, promotionid, type, '')
    .then((res) => {
      // 上傳檔案
      if(formData.files) {
        doUploadDepositProof(res.data, formData.files[0])
      }
    });

  }

  return (
    <>
      {isShowProviderCards && <ProviderCards {...providerProps} />}
      <ChannelCards {...channelProps} />
      {hasExtended && <BankExtended {...extended} banktype={bankType} />}
      <DepositAmountInput currentChannel={currentChannel} />
      <DepositPromotion />
      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isManual={isManual} />
    </>
  )
};
