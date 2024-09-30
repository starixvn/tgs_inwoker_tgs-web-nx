import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { DepositFormContext, useChannelList, useUploadFile } from "@tgs-web-nx/core/hooks";
import {
  Cards as ChannelCards,
  DepositAmountInput,
  DepositExtended,
  DepositPromotion,
  DepositSubmitButton,
  Upload,
} from "..";
import { LayoutProps } from "./index";

/**
 * ThirdParty UI
 */
export const ThirdPartyLayout = ({
  filterGroupList,
  groupCode,
  handlePerformDeposit,
}: LayoutProps) => {
  const { channelList, currentChannel, extended } = useChannelList(filterGroupList, groupCode);
  const { formData } = useContext(DepositFormContext);
  const { doThirdPartyDeposit } = useWalletStore();
  const { handleUploadFile, isPending, uploadKey } = useUploadFile();

  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(
    formData.amount,
    formData.maxAmount,
    formData.minAmount,
  );
  const isDisabled = config.features.Deposit_UploadRequired
    ? isDefaultDisabled || formData.files === null
    : isDefaultDisabled;

  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const { amount, id, promotionid, type, paymentcode } = formData;
    //TGS-5343 兼容三方和手動支付
    if (paymentcode !== "Manual") {
      if (handlePerformDeposit) {
        handlePerformDeposit();
      }
    } else {
      doThirdPartyDeposit(amount, id, promotionid, type).then((res) => {
        handleUploadFile(formData.files, res);
      });
    }
  };

  return (
    <>
      <ChannelCards {...props} />

      <DepositExtended qrcode={extended?.qrCode} />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload key={uploadKey} />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isPending || isDisabled} />
    </>
  );
};
