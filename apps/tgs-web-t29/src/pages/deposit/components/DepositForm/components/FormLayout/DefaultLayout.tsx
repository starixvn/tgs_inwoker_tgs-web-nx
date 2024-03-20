import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";


/**
 * 預設 UI
 */
export const DefaultLayout = ({
  filterGroupList,
  handleSubmit,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended, hasExtended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {performDeposit} = useWalletStore();
  const isManual = currentChannel?.paymentcode === 'Manual';
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isManualDisabled = config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled;
  const isDisabled = isManual ? isManualDisabled : isDefaultDisabled;
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    if(handleSubmit) {
      handleSubmit();
      return;
    }

    const {amount, id, promotionid, paymentcode, type} = formData;
    performDeposit(amount, id, promotionid, paymentcode, type);
  }

  return (
    <>
      <ChannelCards {...props} />
      
      {hasExtended && <ExtendedLayout {...extended} banktype={currentChannel?.banktype} />}

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />
      
      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDisabled} />
    </>
  )
};
