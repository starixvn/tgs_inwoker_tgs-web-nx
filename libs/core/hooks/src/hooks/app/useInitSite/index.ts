import { useGeneralStore } from "@tgs-web-nx/core";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { getFavicon } from "@tgs-web-nx/utils";
import { useLanguageDetect } from "./useLanguageDetect";
import { useCheckRegisterProcess } from "./useCheckRegisterProcess";
import { useInitSiteApiData } from "./useInitSiteApiData";

export function useInitSite() {
  const { general } = useGeneralStore();

  useLanguageDetect();
  // useHandleMaintenance();
  // useUpdateProviderBalance();
  useCheckRegisterProcess();
  getFavicon();


  const { isInitSiteLoading } = useInitSiteApiData();
  const { isAuthLoading } = useAuthContext();

  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) && !general.isMaintenance;

  return {
    isLoading,
    isAuthLoading,
  };
}
