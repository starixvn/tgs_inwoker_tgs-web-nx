import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import {
  useAuth,
  useAuthDialog,
  useRegisterForm,
  useUpdatePageName,
} from "@tgs-web-nx/core/features";
import { useParams } from "react-router";
import { useRwd } from "../../tools";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));
  const history = useHistory();
  const { isLogin } = useAuth();
  const { isDesktopSize } = useRwd();

  const { playername } = useParams<{ playername: string }>();
  const { handleToggleRegisterDialog } = useAuthDialog();
  const { handleClickConfirmAdult } = useRegisterForm();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }

    if (playername && isDesktopSize) {
      handleToggleRegisterDialog(true);
      handleClickConfirmAdult();
    }
  }, []);
}
