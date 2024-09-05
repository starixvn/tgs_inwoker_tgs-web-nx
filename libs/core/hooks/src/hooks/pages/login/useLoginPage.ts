import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAuth, useAuthDialog, useHomeGameContext, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useRwd } from "../../tools";

export function useLoginPage() {
  useUpdatePageName(i18n.t("common.login"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog } = useAuthDialog();
  const { handleChangeGameType } = useHomeGameContext();

  useEffect(() => {
    if (isLogin) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    }

    // if (isDesktopSize) {
    //   handleToggleLoginDialog(true);
    // }

    handleToggleLoginDialog(true);
  }, []);
}
