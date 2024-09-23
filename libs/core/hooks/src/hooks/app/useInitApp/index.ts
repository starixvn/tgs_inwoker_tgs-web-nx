import { useInitLanguage } from "./useInitLanguage";
import { useTokenVerify } from "./useTokenVerify";
import { useFeatureToggle } from "./useFeatureToggle";

export function useInitApp() {
  const { isFeatureToggleFetched } = useFeatureToggle();
  //   const { isLanguageReady } = useInitLanguage(isFeatureToggleFetched);
  const { isTokenVerified } = useTokenVerify();
  const { isLanguageReady } = useInitLanguage();

  const isReady = isLanguageReady && isTokenVerified && isFeatureToggleFetched; //&& isFeatureToggleFetched

  return { isReady };
}
