import { useCallback, useMemo, useState } from "react";
import { useGameStore, useWalletStore } from "@tgs-web-nx/core";
import { Provider } from "@tgs-web-nx/types";
import { useAuth, useAuthContext } from "../../useAuth/index";

export function useTransferWallets() {
  const { game } = useGameStore();
  const { getGameBalance } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [providerList, setProviderList] = useState<Provider[]>(game.providerList || []);
  const { isLogin } = useAuth();

  const handleUpdateTransferWallet = (newProvider: Provider) => {
    setProviderList((prevProviderList) => {
      const newProviderList: Provider[] = [];

      let isUpdated = false;
      prevProviderList.forEach((provider) => {
        if (provider.gpcode === newProvider.gpcode) {
          isUpdated = true;
          newProviderList.push(newProvider);
        } else {
          newProviderList.push(provider);
        }
      });

      if (!isUpdated) {
        newProviderList.push(newProvider);
      }

      return newProviderList;
    });
  };

  const fetchTransferWallets = async (providerList: Provider[]) => {
    const filteredProviderList = providerList.filter(
      (provider) =>
        provider.status === 0 &&
        provider.transferwallet &&
        !["NTTF", "RTTF", "BTG", "NLC"].includes(provider.gpcode),
    );

    for (const provider of filteredProviderList) {
      //有token才打getGameBalance API,如果token被清除的話(ex:登出),跳出迴圈,不然網站會不斷re-render
      if (localStorage.getItem("token0") || localStorage.getItem("token1")) {
        try {
          const response = await getGameBalance(provider.gpcode);

          if (!response || !response.IsSuccess) {
            console.log(provider.gpcode);
            continue;
          }

          handleUpdateTransferWallet({
            ...provider,
            balance: response.data.balance,
          });
        } catch (error) {
          console.error(`Error fetching balance for ${provider.gpcode}`, error);
        }
      } else {
        break;
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
    for (const provider of providerList) {
      const balance = provider.balance || 0;
      walletBalance += balance;
    }

    return walletBalance;
  }, [providerList]);

  return {
    transferWalletBalance,
    fetchTransferWalletBalance,
    isLoading,
    providerList,
  };
}
