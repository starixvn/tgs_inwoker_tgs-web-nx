import { useGeneralStore } from "@tgs-web-nx/core";
import { useLanguageDetect } from "@/core/hooks/app/useInitSite/useLanguageDetect";
import { useHandleMaintenance } from "@/core/hooks/app/useInitSite/useHandleMaintenance";
import { useUpdateProviderBalance } from "@/core/hooks/app/useInitSite/useUpdateProviderBalance";
import { useCheckRegisterProcess } from "@/core/hooks/app/useInitSite/useCheckRegisterProcess";
import { useInitSiteApiData } from "@/core/hooks/app/useInitSite/useInitSiteApiData";
import { useAuth } from "@/core/feature/useAuth";

export function useInitSite() {
  const { general } = useGeneralStore();

  useLanguageDetect();
  useHandleMaintenance();
  useUpdateProviderBalance();
  useCheckRegisterProcess();

  const { isInitSiteLoading } = useInitSiteApiData();
  const { isAuthLoading } = useAuth();

  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) && !general.isMaintenance;

  return {
    isLoading,
    isAuthLoading,
  };
}
