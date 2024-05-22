import { Common } from "@tgs-web-nx/utils";
import { useContext } from "react";
import { DepositFormContext, useChannelList } from "@tgs-web-nx/core/hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion, DepositSubmitButton } from "../../components";
import { LayoutProps } from "./index";

type Props = {
  isShowExtendedLayout?: boolean;
  isManualPending?: boolean;
} & LayoutProps;

/**
 * 預設 UI
 */
export const DefaultLayout = ({
  filterGroupList,
  groupCode,
  isThirdPartyPending,
  handlePerformDeposit,
}: Props) => {
  const {channelList, currentChannel} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const isDefaultDisabled = Common.validateDepositAndWithdrawAmount(formData.amount, formData.maxAmount, formData.minAmount);
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

    /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    if(handlePerformDeposit){
      handlePerformDeposit();
    }
  }

  return (
    <>
      <ChannelCards {...props} />

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isDisabled={isDefaultDisabled || !!isThirdPartyPending} />
    </>
  )
};
