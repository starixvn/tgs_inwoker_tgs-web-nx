import { useWalletStore } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";
import { useAuth } from "../../useAuth/index";

export function useMainWallet() {
  const {
    wallet: { mainSymbol, mainBalance },
    updateBalanceList,
  } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin } = useAuth();

  const fetchMainWalletBalance = useCallback(async () => {
    if (!isLogin) return;

    try {
      setIsLoading(true);
      await updateBalanceList();
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [updateBalanceList]);

  return {
    mainWalletBalance: mainBalance,
    fetchMainWalletBalance,
    isLoading,
    mainSymbol,
  };
}
