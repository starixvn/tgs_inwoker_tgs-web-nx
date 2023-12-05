import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));
  const history = useHistory();
  const { isLogin } = useAuth();

  useEffect(() => {
    // console.log(account);
    if (isLogin) {
      history.push("/");
    }
  }, []);
}
