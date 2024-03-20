import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";
import {
  ExchangeRateContainer,
  LimitAmount,
  LimitLabel,
} from "@/components/styled-component/Deposit";

/**
 * TRC UI
 */
export const TrcLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended, hasExtended} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doUsdtDeposit} = useWalletStore();
  const isManual = currentChannel?.paymentcode === 'Manual';
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const isManualDisabled = config.features.Deposit_UploadRequired ? isDefaultDisabled || formData.files === null : isDefaultDisabled;
  const isDisabled = isManual ? isManualDisabled : isDefaultDisabled;
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };
  const usdtRate = extended?.rate;
  const {amount, id, promotionid, type} = formData;
  

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    doUsdtDeposit(amount, id, promotionid, type);
  }

  return (
    <>
      <ChannelCards {...props} />
      
      {hasExtended && <ExtendedLayout {...extended} isShowDepositSelectBankName={false} banktype={currentChannel?.banktype}/>}

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
        <div>
          <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
          {" :  "}
          <LimitAmount>{` ${
            isNaN(Number(amount)) === false
              ? Common.formatNumberWithCommasNoRounding(Number(amount) / Number(usdtRate))
              : 0
          }`}</LimitAmount>
        </div>
      </ExchangeRateContainer>

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDisabled} />
    </>
  )
};

