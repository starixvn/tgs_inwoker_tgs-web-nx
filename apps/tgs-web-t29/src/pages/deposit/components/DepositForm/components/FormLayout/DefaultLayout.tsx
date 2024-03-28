import {useChannelList} from '../../hooks';
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";
import {groupCodeConfig, GroupCodeEnum} from '@/pages/deposit/components/DepositForm/types';

type Props = {
  isShowExtendedLayout?: boolean;
  isManualPending?: boolean;
} & LayoutProps;

/**
 * 預設 UI
 */
export const DefaultLayout = ({
  filterGroupList,
  handleSubmit,
  handlePerformDeposit,
  groupCode,
  isManualPending,
  isThirdPartyPending,
}: Props) => {
  const {channelList, currentChannel, extended, isManual} = useChannelList(filterGroupList, groupCode);
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  const bankType = groupCode ? groupCodeConfig[groupCode as GroupCodeEnum].bankType : null;

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

      {isManual && <ExtendedLayout {...extended} banktype={bankType} />}

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
