import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import {
  useAuth,
  useAuthDialog,
  useHomeGameContext,
  useUpdatePageName,
} from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useRwd } from "../../tools";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog } = useAuthDialog();
  const { handleChangeGameType } = useHomeGameContext();

  useEffect(() => {
    if (isLogin) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    }

    if (isDesktopSize) {
      handleToggleRegisterDialog(true);
    }
  }, []);
}
