import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuth } from "@/core/feature/useAuth";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));
  const history = useHistory();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, []);
}
