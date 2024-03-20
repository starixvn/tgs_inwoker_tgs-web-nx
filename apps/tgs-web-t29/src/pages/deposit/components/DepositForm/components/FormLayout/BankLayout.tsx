import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList, useProviderList } from "../../hooks";
import { Cards, DepositAmountInput, DepositPromotion, Upload, DepositSubmitButton, DepositFormContext } from "../../components";
import { BankExtended } from "../Extended";
import { LayoutProps } from "./index";


/**
 * 客製化 金流商 UI
 */
export const BankLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {providerList, filterProviderList, providerCode} = useProviderList(filterGroupList, groupCode);
  const {channelList, currentChannel, extended, hasExtended} = useChannelList(filterProviderList, providerCode);
  const {performDeposit, doBankDeposit, doBankDepositWithDetail} = useWalletStore();
  const {formData} = useContext(DepositFormContext);

  const channelProps = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  const providerProps = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: providerList,
  };

  const isManual = providerCode === 'Manual';
  const [ProviderCards, ChannelCards] = [Cards, Cards];
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isManualDisabled = config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled;
  const isDisabled = isManual ? isManualDisabled : isDefaultDisabled;
  

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, paymentcode, type, name, account} = formData;

    // 預設銀行存款
    if(!isManual) {
      performDeposit(amount, id, promotionid, paymentcode, type);
    }

    // 手動存款
    if(isManual) {
      doBankDeposit(name, account, amount, id, promotionid, type, '');
    }

  }

  return (
    <>
      <ProviderCards {...providerProps} />
      <ChannelCards {...channelProps} />
      {hasExtended && <BankExtended {...extended} banktype={currentChannel?.banktype} />}
      <DepositAmountInput currentChannel={currentChannel} />
      <DepositPromotion />
      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDisabled} />
    </>
  )
};
