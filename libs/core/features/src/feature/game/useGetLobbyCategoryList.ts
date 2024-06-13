import { useMemo } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "../game/useHomeGameContext";

export function useGetLobbyCategoryList() {
  const sportTypes = [GameTypeEnum.SPORTS, GameTypeEnum.RNGSPORTS];

  const { providerList, activeGameType, activeNavPopupGameType } = useHomeGameContext();

  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return activeGameType === GameTypeEnum.SPORTS
        ? //目前系統將虛擬體育歸類在體育底下,所以體育項目要連同虛擬體育一起顯示
          sportTypes.some((type) => provider.gametypes.includes(type))
        : provider.gametypes.includes(activeGameType);
    });
  }, [activeGameType, JSON.stringify(providerList)]);

  const navPopupCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return activeNavPopupGameType === GameTypeEnum.SPORTS
        ? //目前系統將虛擬體育歸類在體育底下,所以體育項目要連同虛擬體育一起顯示
          sportTypes.some((type) => provider.gametypes.includes(type))
        : provider.gametypes.includes(activeNavPopupGameType);
    });
  }, [activeNavPopupGameType, JSON.stringify(providerList)]);

  return { lobbyCategoryList, navPopupCategoryList };
}
