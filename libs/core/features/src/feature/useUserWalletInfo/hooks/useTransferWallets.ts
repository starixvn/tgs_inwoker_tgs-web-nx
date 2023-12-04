import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import { Provider } from "@tgs-web-nx/types";
import { useAuth } from "../../useAuth/index";

export interface TransferWallet {
  abbreviation: string;
  balance: number;
}

export function useTransferWallets() {
  const { game } = useGameStore();
  const { getGameBalance } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [transferWallets, setTransferWallets] = useState<TransferWallet[]>([]);
  const { isLogin } = useAuth();

  const handleUpdateTransferWallet = (newTransferWallet: TransferWallet) => {
    setTransferWallets((prevTransferWallets) => {
      const newTransferWallets: TransferWallet[] = [];

      let isUpdated = false;
      prevTransferWallets.forEach((transferWallet) => {
        if (transferWallet.abbreviation === newTransferWallet.abbreviation) {
          isUpdated = true;
        }

        newTransferWallets.push(transferWallet);
      });

      if (!isUpdated) {
        newTransferWallets.push(newTransferWallet);
      }

      return newTransferWallets;
    });
  };

  const fetchTransferWallets = async (providerList: Provider[]): Promise<TransferWallet[]> => {
    const filteredProviderList = providerList.filter(
      (provider) =>
        provider.status === 0 &&
        provider.transferwallet &&
        !["NTTF", "RTTF"].includes(provider.gpcode),
    );

    for (const provider1 of filteredProviderList) {
      try {
        const response = await getGameBalance(provider1.gpcode);

        if (!response || !response.IsSuccess) {
          console.log(provider1.gpcode);
          continue;
        }

        handleUpdateTransferWallet({
          abbreviation: provider1.abbreviation,
          balance: response.data.balance,
        });
      } catch (error) {
        console.error(`Error fetching balance for ${provider1.gpcode}`, error);
      }
    }

    // return transferWalletList.filter((wallet) => wallet !== null) as TransferWallet[];
  };

  const fetchTransferWalletBalance = useCallback(async () => {
    if (!isLogin) return;
    if (!game.providerList.length) return;

    fetchTransferWallets(game.providerList);
  }, [fetchTransferWallets, game.providerList.length]);

  const transferWalletBalance = useMemo(() => {
    let walletBalance = 0;
    for (const transferWallet of transferWallets) {
      const balance = transferWallet.balance || 0;
      walletBalance += balance;
    }

    return walletBalance;
  }, [transferWallets]);

  console.log(transferWallets);

  return {
    transferWalletBalance,
    fetchTransferWalletBalance,
    isLoading,
    transferWallets,
  };
}
