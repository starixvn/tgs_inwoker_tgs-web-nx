import { useWalletStore } from "@tgs-web-nx/core";
import { useCallback, useState } from "react";

export function useMainWallet() {
  const {
    wallet: { mainSymbol, mainBalance },
    updateBalanceList,
  } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchMainWalletBalance = useCallback(async () => {
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
