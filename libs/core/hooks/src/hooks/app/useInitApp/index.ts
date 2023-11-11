import { useInitLanguage } from "./useInitLanguage";
import { useTokenVerify } from "./useTokenVerify";

export function useInitApp() {
  const { isLanguageReady } = useInitLanguage();
  const { isTokenVerified } = useTokenVerify();

  const isReady = isLanguageReady && isTokenVerified;

  return { isReady };
}
