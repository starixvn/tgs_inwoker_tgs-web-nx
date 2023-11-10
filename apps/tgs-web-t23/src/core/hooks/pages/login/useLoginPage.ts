import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/core/utils/i18n";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuth } from "@/core/feature/useAuth";
import { useAuthDialog } from "@/core/feature/useAuthDialog";

export function useLoginPage() {
  useUpdatePageName(i18n.t("common.login"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog } = useAuthDialog();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }

    if (isDesktopSize) {
      handleToggleLoginDialog(true);
    }
  }, []);
}
