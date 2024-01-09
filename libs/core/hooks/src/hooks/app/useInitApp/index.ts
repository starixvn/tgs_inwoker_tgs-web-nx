import { useInitLanguage } from "./useInitLanguage";
import { useTokenVerify } from "./useTokenVerify";
import { useFeatureToggle } from "./useFeatureToggle";

export function useInitApp() {
  const { isFeatureToggleFetched } = useFeatureToggle();
  const { isLanguageReady } = useInitLanguage(isFeatureToggleFetched);
  const { isTokenVerified } = useTokenVerify();

  const isReady = isLanguageReady && isTokenVerified && isFeatureToggleFetched;

  return { isReady };
}
