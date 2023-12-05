import { useInitLanguage } from "./useInitLanguage";
import { useTokenVerify } from "./useTokenVerify";
import { useFeatureToggle } from "./useFeatureToggle";

export function useInitApp() {
  const { isLanguageReady } = useInitLanguage();
  const { isTokenVerified } = useTokenVerify();
  const { isFeatureToggleFetched } = useFeatureToggle();

  const isReady = isLanguageReady && isTokenVerified && isFeatureToggleFetched;

  return { isReady };
}
