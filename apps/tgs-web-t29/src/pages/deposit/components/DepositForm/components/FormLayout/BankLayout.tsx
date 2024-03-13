import { useChannelList, useProviderList } from "../../hooks";
import { Cards } from "../../components";
import { BankExtended } from "../Extended";
import { LayoutProps } from "./index";

/**
 * 客製化 金流商 UI
 */
export const BankLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {providerList, filterProviderList, providerCode} = useProviderList(filterGroupList, groupCode);
  const {channelList, currentChannel} = useChannelList(filterProviderList, providerCode);

  const channelProps = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  const providerProps = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: providerList,
  };

  const extended = currentChannel?.extended;
  const isExtendedVisible = extended && !(Object.values(extended).every(value => value === undefined));

  return (
    <>
      <Cards {...providerProps} />
      <Cards {...channelProps} />
      {isExtendedVisible && <BankExtended {...extended}/>}
    </>
  )
};
