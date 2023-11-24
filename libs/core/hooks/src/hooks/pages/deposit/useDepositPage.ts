import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore, useWalletStore } from "@tgs-web-nx/core";
import { useEffect } from "react";

export function useDepositPage() {
  useUpdatePageName(i18n.t("common.deposit"));
  const { isLogin } = useAuth();
  const { getBankCardList, getDepositMethod } = useWalletStore();
  const { getPromotion } = useGeneralStore();

  useEffect(() => {
    if (!isLogin) return;
    async function fetchDepositData() {
      await getDepositMethod();
      await getBankCardList();
      await getPromotion();
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
  }, [getBankCardList, getDepositMethod, getPromotion, isLogin]);

  return {};
}
