import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { i18n, Common } from "@tgs-web-nx/utils";
import { useChannelList, useUploadFile } from "../../hooks";
import { DepositInput, Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload, DepositExtended } from "../../components";
import { LayoutProps } from "./index";
import { ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";

/**
 * FPS UI
 */
export const FpsLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doFPSDeposit} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();

  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isDisabled = (config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled) || !formData.account;

  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };


  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, account, type} = formData;

    doFPSDeposit(account, amount, id, promotionid, type)
      .then((res) => {
        handleUploadFile(formData.files, res);
      });
  }

  return (
    <>
      <ChannelCards {...props} />

      <ItemContainer>
        <LabelContainer>{i18n.t('deposit.transferAccount')}</LabelContainer>
        <DepositExtended qrcode={extended?.qrCodeFileUrl } />
        <DepositExtended content={extended?.phone} title="phone" />
        <DepositExtended content={extended?.fpsId} title="fpsId" />
        <DepositExtended content={extended?.email} title="email" />
      </ItemContainer>
    
      <DepositInput label="deposit.msgEnterCard" formKey="account" type="number"/>

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDisabled || isPending}/>
    </>
  )
};
