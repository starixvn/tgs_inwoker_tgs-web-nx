import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { DepositFormContext, useChannelList, useUploadFile } from "@tgs-web-nx/core/hooks";
import { Cards as ChannelCards, DepositExtended, DepositAmountInput, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { LayoutProps } from "./index";
import {
  ExchangeRateContainer,
  LimitAmount,
  LimitLabel,
} from "@/components/styled-component/Deposit";
import { ItemContainer, LabelContainer} from "@/components/styled-component/ProfileForms";

/**
 * TRC UI
 */
export const TrcLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doUsdtDeposit} = useWalletStore();
  const {handleUploadFile, isPending, uploadKey} = useUploadFile();
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };
  const usdtRate = extended?.rate;
  const {amount, id, promotionid, type} = formData;
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isDisabled = (config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled);
  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    doUsdtDeposit(amount, id, promotionid, type).then((res) => {
      handleUploadFile(formData.files, res);
    });
  }

  return (
    <>
      <ChannelCards {...props} />

      <ItemContainer>
        <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>
        <DepositExtended qrcode={extended?.qrCode} />
        <DepositExtended content={extended?.address} title="address"/>
      </ItemContainer>

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      <ExchangeRateContainer>
        <div>
          <LimitLabel>
            {i18n.t("deposit.exchangeRate")} 1 {`${config.currency}`} :{" "}
          </LimitLabel>
          <LimitAmount>{` ${usdtRate} `}</LimitAmount>
          <LimitLabel>USDT</LimitLabel>
        </div>

        {/*上分金额*/}
        <div style={{color: "#fff"}}>
          <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
          {" :  "}
          <LimitAmount>{` ${
            !isNaN(Number(amount))
              ? Common.formatNumberWithCommasNoRounding(Number(amount) / Number(usdtRate))
              : 0
          }`}</LimitAmount>
        </div>
      </ExchangeRateContainer>

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      <Upload key={uploadKey}/>

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isPending || isDisabled} />
    </>
  )
};

