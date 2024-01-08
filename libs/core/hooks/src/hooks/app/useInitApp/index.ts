import { useInitLanguage } from "./useInitLanguage";
import { useTokenVerify } from "./useTokenVerify";
import { useFeatureToggle } from "./useFeatureToggle";

export function useInitApp() {
  const { isFeatureToggleFetched, isError: featureToggleError } = useFeatureToggle();
  const { isLanguageReady, isLanguageError } = useInitLanguage(isFeatureToggleFetched);
  const { isTokenVerified } = useTokenVerify();

  const isReady = isLanguageReady && isFeatureToggleFetched && isTokenVerified;

  return {
    isReady,
    featureToggleError,
    isLanguageError
  };
}
