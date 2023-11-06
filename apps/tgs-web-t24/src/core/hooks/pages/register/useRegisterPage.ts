import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useEffect } from "react";
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
