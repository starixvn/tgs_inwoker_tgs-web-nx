import {
  useAuthContext,
  useUpdatePageName,
  useUserWalletInfoContext,
} from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useGameStore } from "@tgs-web-nx/core";
import { useEffect } from "react";

export function useTransferPage() {
  useUpdatePageName(i18n.t("transfer.title"));
  const { game } = useGameStore();
  const { fetchTransferWalletBalance, fetchBalance } = useUserWalletInfoContext();
  const { isLogin } = useAuthContext();
  const { setMainWalletLoading, setTransferWalletLoading } = useUserWalletInfoContext();

  const getAllGameBalance = async () => {
    setMainWalletLoading(true);
    setTransferWalletLoading(true);
    await fetchTransferWalletBalance();
    setMainWalletLoading(false);
    setTransferWalletLoading(false);
  };

  useEffect(() => {
    if (!isLogin) return;
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.providerList.length, isLogin]);

  return {
    getAllGameBalance,
  };
}
