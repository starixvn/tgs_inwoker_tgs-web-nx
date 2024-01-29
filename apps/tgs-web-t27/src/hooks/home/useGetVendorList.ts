import { useEffect, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

export enum GameTypeEnum {
  NONE = 0,
  SPORTS = 1,
  ESPORTS = 4,
  LIVELOBBY = 6,
  QIPAILOBBY = 8,
  FISH = 9,
  LOTTERYLOBBY = 14,
  SLOT = 15,
  TABLEGAME = 16,
  COCKFIGHT = 17,
}
export const useGetVendorList = () => {
  const { providerList } = useHomeGameContext();
  const [providerListGroupByGameType, setProviderListGroupByGameType] = useState<Array<{ [key: string]: ProviderDto[] }>>([]);

  const liveCasinoList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.LIVELOBBY);
  })

  const slotList = providerList.filter((provider) => {
    return provider.gametypes.includes(GameTypeEnum.SLOT);
  })

  setProviderListGroupByGameType([
    { "Live Casino": liveCasinoList },
    { "Slot": slotList }
  ]);
}

export default useGetVendorList;
