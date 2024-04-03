import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n, Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList, useUploadFile } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload, DepositInput, DepositExtended } from "../../components";
import { LayoutProps } from "./index";
import { ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";

/**
 * Coinsph UI
 */
export const CoinsphLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doCoinsphDeposit} = useWalletStore();
  const {handleUploadFile, isPending, uploadKey} = useUploadFile();

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
    const {amount, id, promotionid, name, type, phone, address} = formData;

    doCoinsphDeposit(amount, id, promotionid, type, '', name, phone, address)
      .then((res) => {
        handleUploadFile(formData.files, res);
      });
  }

  return (
    <>
      <ChannelCards {...props} />
      
      <ItemContainer>
        <LabelContainer>{i18n.t('deposit.transferAccount')}</LabelContainer>
        <DepositExtended qrcode={extended?.qrCode } />
        <DepositExtended content={extended?.phone} title="phone" />
        <DepositExtended content={extended?.name} title="name" />
      </ItemContainer>
      
      <DepositInput label="deposit.msgPlsEnterAccount" formKey="name" />
      <DepositInput label="common.msgEnterPhone" formKey="phone" type="tel" />
      <DepositInput label="common.msgEnterWithdrawalNumber" formKey="address" />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload key={uploadKey}/>

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isPending || isDisabled} />
    </>
  )
};
