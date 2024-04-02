import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList, useUploadFile } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositExtended, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "..";
import { LayoutProps } from "./index";

/**
 * ThirdParty UI
 */
export const ThirdPartyLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doThirdPartyDeposit} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();

  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isDisabled = (config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled);

  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, type} = formData;
    doThirdPartyDeposit(amount, id, promotionid, type)
      .then((res) => {
        handleUploadFile(formData.files, res);
    });
  }

  return (
    <>
      <ChannelCards {...props} />

      <DepositExtended qrcode={extended?.qrCode} />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isPending || isDisabled} />
    </>
  )
};
