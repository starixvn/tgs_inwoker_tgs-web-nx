import { useContext } from "react";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { DepositFormContext, useChannelList, useUbPay } from "@tgs-web-nx/core/hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion, DepositSubmitButton } from "..";
import { LayoutProps } from "./index";
import {
  LimitAmount,
  LimitLabel,
} from "@/components/styled-component/Deposit";
import LoadingBlock from "@/components/project/LoadingBlock";
import { ItemContainer } from "@/components/styled-component/ProfileForms";

/**
 * Tron UI
 */
export const TronLayout = ({
  filterGroupList,
  groupCode,
  handlePerformDeposit,
}: LayoutProps) => {
  const {channelList, currentChannel} = useChannelList(filterGroupList, groupCode);
  const brandPaymentId = currentChannel?.paymentcode === "UBPay" ? currentChannel?.id : undefined;
  const {data, isFetching} = useUbPay(brandPaymentId);
  const {formData} = useContext(DepositFormContext);
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };
  const rate = data?.data.rate;
  const {amount} = formData;
  const isDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    if(handlePerformDeposit){
      handlePerformDeposit();
    }
  }

  const renderRate = () => {
    if(isFetching) {
      return <LoadingBlock size={20}/>
    }

    return brandPaymentId && (<>
        <div>
          <LimitLabel>
            {i18n.t("deposit.exchangeRate")}: {`${rate} ${config.currency}`} :
          </LimitLabel>
          <LimitAmount> 1</LimitAmount>
          <LimitLabel> USDT</LimitLabel>
        </div>

        {/*上分金额*/}
        <div>
          <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
          {" :  "}
          <LimitAmount>{` ${
            !isNaN(Number(amount))
              ? Common.formatCurrency(Number(amount) / Number(rate))
              : 0
          }`}</LimitAmount>
        </div>
      </>
    )
  }

  return (
    <>
      <ChannelCards {...props} />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />
      
      {brandPaymentId && <ItemContainer>
        {renderRate()}
      </ItemContainer>}

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDisabled} />
    </>
  )
};


