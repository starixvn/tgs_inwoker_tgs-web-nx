import { useChannelList } from "../../hooks";
import { Cards } from "../../components";
import { LayoutProps } from "./index";

/**
 * 預設 UI
 */
export const DefaultLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList} = useChannelList(filterGroupList, groupCode);
  
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  return (
    <Cards {...props} />
  )
};
