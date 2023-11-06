import { useCallback } from "react";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useHistory } from "react-router-dom";

export function useNavigation() {
  const appHistory = useHistory();
  const { account } = useAccountStore();

  const navigate = useCallback((page: string) => {
    let pageUrl = page;
    if (
      !(
        account.token ||
        page.indexOf("/promotion") > -1 ||
        page.indexOf("/customer-service") > -1 ||
        page.indexOf("/main/home") > -1 ||
        page.indexOf("/slot") > -1
      )
    ) {
      pageUrl = "/";
    }

    appHistory.push(pageUrl);
  }, []);

  return { navigate };
}
