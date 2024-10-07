import { useEffect, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService } from "@tgs-web-nx/core";

interface ProviderState {
  isLoading: boolean;
  providerList: ProviderDto[];
  error: Error | null;
}
export function useProvider(updateGpCodeList: (providers: ProviderDto[]) => void) {
  const [providerState, setProviderState] = useState<ProviderState>({
    isLoading: false,
    providerList: [],
    error: null,
  });
  const gpCustomSort = brandConfig[mapBrandName(config.brand)].customGameProviderSort;

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
        //客製化排序不為空才做排序
        if (gpCustomSort.length) {
          formattedProviderList.sort((a, b) => {
            const indexA = gpCustomSort.indexOf(a.code);
            const indexB = gpCustomSort.indexOf(b.code);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });
        }
        setProviderState({
          isLoading: false,
          providerList: formattedProviderList,
          error: null,
        });
        updateGpCodeList(response.data);
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
      //因系統沒有鬥雞類別,API回傳的type會是體育,故下列廠商要特別判斷加入鬥雞類別
      //todo:需考慮廠商如果有鬥雞以外的遊戲類別
      if (
        provider.code === "AWC_COCKFIGHT" ||
        provider.code === "SM01" ||
        provider.code === "GA28"
      ) {
        return {
          ...provider,
          gametypes: [GameTypeEnum.COCKFIGHT],
        };
      }

      // if (provider.code === "PPTF" && provider.name === "PragmaticPlay") {
      //   return {
      //     ...provider,
      //     gametypes: [GameTypeEnum.LIVELOBBY, GameTypeEnum.SLOT, GameTypeEnum.TABLEGAME],
      //   };
      // }

      return provider;
    })
  );
}
