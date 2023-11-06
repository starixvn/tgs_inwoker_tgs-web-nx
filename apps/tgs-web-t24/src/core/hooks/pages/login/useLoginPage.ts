import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useEffect } from "react";
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
