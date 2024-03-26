import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useChannelList, useUploadFile } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";
import {
  ExchangeRateContainer,
  LimitAmount,
  LimitLabel,
} from "@/components/styled-component/Deposit";
import {groupCodeConfig, GroupCodeEnum} from '@/pages/deposit/components/DepositForm/types';

/**
 * TRC UI
 */
export const TrcLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended, hasExtended, isManual} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doUsdtDeposit} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };
  const usdtRate = extended?.rate;
  const {amount, id, promotionid, type} = formData;
  const bankType = groupCode ? groupCodeConfig[groupCode as GroupCodeEnum].bankType : null;

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

      {hasExtended && <ExtendedLayout {...extended} isShowDepositSelectBankName={false} banktype={bankType}/>}

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
            !isNaN(Number(amount))
              ? Common.formatNumberWithCommasNoRounding(Number(amount) / Number(usdtRate))
              : 0
          }`}</LimitAmount>
        </div>
      </ExchangeRateContainer>

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isManual={isManual} isPending={isPending}/>
    </>
  )
};

