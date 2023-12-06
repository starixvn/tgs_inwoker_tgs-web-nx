import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { useEffect } from "react";

export function useWithdrawalPage() {
  useUpdatePageName(i18n.t("common.withdrawal"));
  const { isLogin } = useAuth();
  const { getWithdrawalChannel } = useWalletStore();

  useEffect(() => {
    if (!isLogin) return;
    async function fetchDepositData() {
      await getWithdrawalChannel();
    }

    fetchDepositData().catch((error) => console.log(error));

    // call api every 30 mins
    const countDownInterval = setInterval(
      () => {
        fetchDepositData().catch((error) => console.log(error));
      },
      30 * 60 * 1000,
    );

    return () => {
      clearInterval(countDownInterval);
    };
  }, [getWithdrawalChannel, isLogin]);
}
