import { useGeneralStore } from "@tgs-web-nx/core";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { getFavicon } from "@tgs-web-nx/utils";
import { useLanguageDetect } from "./useLanguageDetect";
import { useCheckRegisterProcess } from "./useCheckRegisterProcess";
import { useInitSiteApiData } from "./useInitSiteApiData";
import { useEffect } from "react";

export function useInitSite() {
  const { general, getAffiliateStatus } = useGeneralStore();

  useLanguageDetect();
  // useHandleMaintenance();
  // useUpdateProviderBalance();
  useCheckRegisterProcess();

  useEffect(() => {
    getFavicon();
    getAffiliateStatus();
  }, []);
  const { isInitSiteLoading } = useInitSiteApiData();
  const { isAuthLoading } = useAuthContext();

  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) && !general.isMaintenance;

  return {
    isLoading,
    isAuthLoading,
  };
}
