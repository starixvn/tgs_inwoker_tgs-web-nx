import { useCallback, useMemo, useState } from "react";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import { Provider } from "@tgs-web-nx/types";

export interface TransferWallet {
  abbreviation: string;
  balance: number;
}

export function useTransferWallets() {
  const { game } = useGameStore();
  const { getGameBalance } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [transferWallets, setTransferWallets] = useState<TransferWallet[]>([]);

  const fetchTransferWallets = useCallback(
    async (providerList: Provider[]): Promise<TransferWallet[]> => {
      if (!providerList.length) {
        return [];
      }

      const transferWalletList: (TransferWallet | null)[] = await Promise.all(
        providerList
          .filter(
            (provider) =>
              provider.status === 0 &&
              provider.transferwallet &&
              !["NTTF", "RTTF"].includes(provider.gpcode),
          )
          .map(async (provider) => {
            try {
              const response = await getGameBalance(provider.gpcode);
              if (response && response.IsSuccess) {
                return {
                  abbreviation: provider.abbreviation,
                  balance: response.data.balance,
                };
              } else {
                console.log(provider.gpcode);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching balance for ${provider.gpcode}`, error);
              return null;
            }
          }),
      );

      return transferWalletList.filter((wallet) => wallet !== null) as TransferWallet[];
    },
    [getGameBalance],
  );

  const fetchTransferWalletBalance = useCallback(async () => {
    if (!game.providerList.length) return;

    try {
      setIsLoading(true);
      const transferWalletList = await fetchTransferWallets(game.providerList);
      setTransferWallets(transferWalletList);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransferWallets, game.providerList.length]);

  const transferWalletBalance = useMemo(() => {
    let walletBalance = 0;
    for (const transferWallet of transferWallets) {
      const balance = transferWallet.balance || 0;
      walletBalance += balance;
    }

    return walletBalance;
  }, [transferWallets]);

  return {
    transferWalletBalance,
    fetchTransferWalletBalance,
    isLoading,
    transferWallets,
  };
}
