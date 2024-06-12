import { useWalletStore } from "@tgs-web-nx/core";

export function useGetChannelCode() {
  const { wallet } = useWalletStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getChannelCode = (item: any) => {
    const targetType = wallet.withdrawalList.find(
      (withdrawalType) => withdrawalType.banktype === item.banktype,
    );
    const targetChannel = targetType?.channel.find(
      (channel) => channel.channelid === item.paymentchannelid,
    );
    return (targetChannel?.channelcode && `${targetChannel?.channelcode}`) || "";
  };

  return {
    getChannelCode,
  };
}
