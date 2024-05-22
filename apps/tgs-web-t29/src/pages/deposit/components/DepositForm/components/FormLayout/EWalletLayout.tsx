import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n, Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useNotifications } from "@tgs-web-nx/core/features";
import { DepositFormContext, useChannelList, useUploadFile } from "@tgs-web-nx/core/hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion, DepositSubmitButton, Upload, DepositInput, DepositExtended } from "..";
import { LayoutProps } from "./index";
import { ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";

/**
 * EWallet UI
 */
export const EWalletLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doEWalletDeposit} = useWalletStore();
  const {handleUploadFile, isPending, uploadKey} = useUploadFile();
  const {alert} = useNotifications();
  
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
    const {amount, id, promotionid, eMoneyName, type, phone} = formData;

    doEWalletDeposit(amount, id, promotionid, type, 'note', eMoneyName, phone)
      .then((res) => {
        if(formData.files && res?.IsSuccess) {
          handleUploadFile(formData.files, res);
        }

        if(!res?.IsSuccess) {
          alert("", res?.data.errmsg ?? '');
        }
      })
  }

  return (
    <>
      <ChannelCards {...props} />
      
      <ItemContainer>
        <LabelContainer>{i18n.t('deposit.transferAccount')}</LabelContainer>
        <DepositExtended qrcode={extended?.qrCode } />
        <DepositExtended content={extended?.phone} title="phone" />
        <DepositExtended content={extended?.name} title="name" />
        <DepositExtended content={extended?.eMoneyName} title="eMoneyName" />
      </ItemContainer>
      
      <DepositInput label="extended.eMoneyName" formKey="eMoneyName" />
      <DepositInput label="common.msgEnterPhone" formKey="phone" type="tel" />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload key={uploadKey} />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isPending || isDisabled} />
    </>
  )
};
