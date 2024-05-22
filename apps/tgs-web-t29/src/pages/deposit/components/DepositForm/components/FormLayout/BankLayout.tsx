import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { i18n, Common } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { DepositFormContext, useChannelList, useProviderList, useUploadFile } from "@tgs-web-nx/core/hooks";
import { Cards, DepositAmountInput, DepositPromotion, Upload, DepositSubmitButton, DepositInput, DepositExtended } from "../../components";
import { LayoutProps } from "./index";
import { ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";

const limitAmount = 1;

/**
 * 客製化 金流商 UI
 */
export const BankLayout = ({
  filterGroupList,
  groupCode,
  handlePerformDeposit,
  isThirdPartyPending,
}: LayoutProps) => {
  const {providerList, filterProviderList, providerCode} = useProviderList(filterGroupList, groupCode);
  const {channelList, currentChannel, extended, isManual} = useChannelList(filterProviderList, providerCode);
  const {doBankDeposit} = useWalletStore();
  const {formData} = useContext(DepositFormContext);
  const {handleUploadFile, isPending: isUploadFilePending, uploadKey} = useUploadFile();
  const [ProviderCards, ChannelCards] = [Cards, Cards];
  const isShowProviderCards = providerList.length > limitAmount; // 若金流商只有 1 個 => 不顯示
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isManualDisabled = (config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled) || !formData.account || !formData.name;
  const isDisabled = isManual ? isManualDisabled : isDefaultDisabled;
  const isPending = isUploadFilePending || !!isThirdPartyPending;
  const channelProps = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  const providerProps = {
    i18nParam: "depositAndWithdrawalStatus.bankType",
    list: providerList,
  };

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, type, name, account} = formData;

    // 預設銀行存款
    if(!isManual && handlePerformDeposit) {
        handlePerformDeposit();
      return;
    }

    // 手動存款
    doBankDeposit(name, account, amount, id, promotionid, type, '')
      .then((res) => {
        handleUploadFile(formData.files, res);
      }
    );

  }
    
  return (
    <>
      {isShowProviderCards && <ProviderCards {...providerProps} />}
      <ChannelCards {...channelProps} />

      {isManual && <ItemContainer>
        <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>
        <DepositExtended qrcode={extended?.logo} />
        <DepositExtended content={extended?.name} title="name"/>
        <DepositExtended content={extended?.bankAccount} title="bankAccount"/>
      </ItemContainer>}
      
      {isManual && <DepositInput label="deposit.msgPlsEnterAccount" formKey="name" />}
      {isManual && <DepositInput label="deposit.msgEnterCard" formKey="account" type="number"/>}
      <DepositAmountInput currentChannel={currentChannel} />
      <DepositPromotion />
      {isManual && <Upload key={uploadKey} />}

      {/* 提交表單 */}
      <DepositSubmitButton 
        handleOnSubmit={handleOnSubmit}
        isDisabled={isPending || isDisabled}
      />
    </>
  )
};
