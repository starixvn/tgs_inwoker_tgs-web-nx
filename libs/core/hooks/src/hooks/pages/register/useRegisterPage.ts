import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useAccountStore } from "@tgs-web-nx/core";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));
  const history = useHistory();
  const { isLogin } = useAuth();
  const { account } = useAccountStore();

  useEffect(() => {
    // console.log(account);
    if (isLogin) {
      history.push("/");
    }
  }, []);
}
