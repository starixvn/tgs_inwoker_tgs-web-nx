import {useChannelList} from '../../hooks';
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion, DepositSubmitButton, Upload } from "..";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";

type Props = {
  isShowExtendedLayout?: boolean;
  isManualPending?: boolean;
} & LayoutProps;

/**
 * GCash UI
 */
export const GCashLayout = ({
  filterGroupList,
  handleSubmit,
  groupCode,
  isManualPending,
  isThirdPartyPending,
  handlePerformDeposit,
}: Props) => {
  const {channelList, currentChannel, extended, isManual} = useChannelList(filterGroupList, groupCode);
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

    /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    if(handleSubmit) {
      handleSubmit();
      return;
    }

    if(handlePerformDeposit){
      handlePerformDeposit();
    }
  }

  return (
    <>
      <ChannelCards {...props} />

      {isManual && <ExtendedLayout {...extended} banktype={null} />}

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isManual={isManual} isPending={!!isManualPending || !!isThirdPartyPending}/>
    </>
  )
};
