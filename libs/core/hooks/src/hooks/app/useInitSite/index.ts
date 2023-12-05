import { useGeneralStore } from "@tgs-web-nx/core";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { useLanguageDetect } from "./useLanguageDetect";
import { useHandleMaintenance } from "./useHandleMaintenance";
import { useCheckRegisterProcess } from "./useCheckRegisterProcess";
import { useInitSiteApiData } from "./useInitSiteApiData";
import { useUpdateProviderBalance } from "./useUpdateProviderBalance";

export function useInitSite() {
  const { general } = useGeneralStore();

  useLanguageDetect();
  useHandleMaintenance();
  // useUpdateProviderBalance();
  useCheckRegisterProcess();

  const { isInitSiteLoading } = useInitSiteApiData();
  const { isAuthLoading } = useAuthContext();

  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) && !general.isMaintenance;

  return {
    isLoading,
    isAuthLoading,
  };
}
