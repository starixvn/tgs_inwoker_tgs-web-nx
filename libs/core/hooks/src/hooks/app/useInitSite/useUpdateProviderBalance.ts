import { useEffect } from "react";
import config from "@tgs-web-nx/config";
import { useAccountStore, useGameStore, useWalletStore } from "@tgs-web-nx/core";

export function useUpdateProviderBalance() {
  const { game } = useGameStore();
  const { account } = useAccountStore();
  const { getGameBalance } = useWalletStore();

  const handleUpdateProviderBalance = () => {
    if (config.features.ForceRedirectAddCard && !account.info.bankInfoAuthentication) return;

    // update provider's game balance
    game.providerList
      .filter((provider) => provider.status === 0 && provider.transferwallet)
      .filter((provider) => provider.abbreviation !== "NTTF" && provider.abbreviation !== "RTTF")
      .map((a) => {
        getGameBalance(a.abbreviation);
      });
  };

  useEffect(() => {
    if (!account.token) return;

    handleUpdateProviderBalance();
  }, [JSON.stringify(game.providerList)]);

  return {
    handleUpdateProviderBalance,
  };
}
