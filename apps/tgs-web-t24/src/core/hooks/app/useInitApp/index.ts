import { useInitLanguage } from "@/core/hooks/app/useInitApp/useInitLanguage";
import { useTokenVerify } from "@/core/hooks/app/useInitApp/useTokenVerify";

export function useInitApp() {
  const { isLanguageReady } = useInitLanguage();
  const { isTokenVerified } = useTokenVerify();

  const isReady = isLanguageReady && isTokenVerified;

  return { isReady };
}
