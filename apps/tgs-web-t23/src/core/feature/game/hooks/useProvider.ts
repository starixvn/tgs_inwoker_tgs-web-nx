import { useEffect, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";

interface ProviderState {
  isLoading: boolean;
  providerList: ProviderDto[];
  error: Error | null;
}
export function useProvider() {
  const [providerState, setProviderState] = useState<ProviderState>({
    isLoading: false,
    providerList: [],
    error: null,
  });

  useEffect(() => {
    const getProviderList = async () => {
      try {
        setProviderState({
          isLoading: true,
          providerList: [],
          error: null,
        });
        const response = await GameService.GetProviderList();

        const formattedProviderList = getFormattedProviderList(response.data);

        setProviderState({
          isLoading: false,
          providerList: formattedProviderList,
          error: null,
        });
      } catch (error: any) {
        console.error(error);
        setProviderState({
          isLoading: false,
          providerList: [],
          error: error,
        });
      }
    };

    getProviderList();
  }, []);

  return {
    isLoading: providerState.isLoading,
    providerList: providerState.providerList,
    error: providerState.error,
  };
}

function getFormattedProviderList(providerList: ProviderDto[]): ProviderDto[] {
  return (
    providerList &&
    providerList.map((provider) => {
      if (provider.code === "BTI" && config.currency === "PHP") {
        return {
          ...provider,
          code: "PHSB",
          name: "PHSB",
        };
      }

      if (provider.code === "AWC_COCKFIGHT" || provider.code === "SM01") {
        return {
          ...provider,
          gametypes: [GameTypeEnum.COCKFIGHT],
        };
      }

      return provider;
    })
  );
}
