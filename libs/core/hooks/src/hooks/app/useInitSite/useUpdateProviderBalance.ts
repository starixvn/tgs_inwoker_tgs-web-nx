import { useEffect } from "react";
import config from "@tgs-web-nx/config";
import { useAccountStore, useGameStore, useWalletStore } from "@tgs-web-nx/core";

export function useUpdateProviderBalance() {
  const {
    game: { providerList },
  } = useGameStore();
  const {
    account: { info, token },
  } = useAccountStore();
  const { getGameBalance } = useWalletStore();

  const handleUpdateProviderBalance = () => {
    if (config.features.ForceRedirectAddCard && !info.bankInfoAuthentication) return;
    if (!providerList.length) return;

    // update provider's game balance
    providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet)
      .filter((provider) => provider.abbreviation !== "NTTF" && provider.abbreviation !== "RTTF")
      .map((a) => {
        getGameBalance(a.abbreviation);
      });
  };

  useEffect(() => {
    if (!token) return;

    handleUpdateProviderBalance();
  }, [token, providerList.length]);

  return {
    handleUpdateProviderBalance,
  };
}
