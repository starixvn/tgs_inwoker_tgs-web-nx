import { useMemo } from "react";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { ProviderDto } from "@/core/models/dto/game/GetProviderListResDto";

export function useGetLobbyCategoryList() {
  const { providerList, activeGameType } = useHomeGameContext();

  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return provider.gametypes.includes(activeGameType);
    });
  }, [activeGameType, JSON.stringify(providerList)]);

  return { lobbyCategoryList };
}
