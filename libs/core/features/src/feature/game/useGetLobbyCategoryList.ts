import { useMemo } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

export function useGetLobbyCategoryList() {
  const { providerList, activeGameType } = useHomeGameContext();

  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider) => {
      return provider.gametypes.includes(activeGameType);
    });
  }, [activeGameType, JSON.stringify(providerList)]);

  return { lobbyCategoryList };
}
