import { useChannelList } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositPromotion } from "../../components";
import { LayoutProps } from "./index";

/**
 * 預設 UI
 */
export const DefaultLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel} = useChannelList(filterGroupList, groupCode);
  
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  return (
    <>
      <ChannelCards {...props} />
      
      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />
      
      {/* 選擇優惠活動 */}
      <DepositPromotion />
    </>
  )
};
