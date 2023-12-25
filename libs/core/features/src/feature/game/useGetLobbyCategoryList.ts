import { useMemo } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useGetLobbyCategoryList() {
  const { providerList, activeGameType, activeNavPopupGameType } = useHomeGameContext();
  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return provider.gametypes.includes(activeGameType);
    });
  }, [activeGameType, JSON.stringify(providerList)]);

  const navPopupCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return provider.gametypes.includes(activeNavPopupGameType);
    });
  }, [activeNavPopupGameType, JSON.stringify(providerList)]);

  return { lobbyCategoryList, navPopupCategoryList };
}
