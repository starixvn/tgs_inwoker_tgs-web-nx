import { useEffect } from "react";
import { useAuth, useAuthDialog, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { useRwd } from "@tgs-web-nx/core/hooks";

export function useForgotPasswordPage() {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleForgotPasswordDialog } = useAuthDialog();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }

    if (isDesktopSize) {
      handleToggleForgotPasswordDialog(true);
    }
  }, []);
}
