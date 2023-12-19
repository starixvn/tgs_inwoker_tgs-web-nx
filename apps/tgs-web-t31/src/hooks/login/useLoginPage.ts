import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHomeGameContext, useUpdatePageName } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useLoginPage() {
  useUpdatePageName(i18n.t("common.login"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  useEffect(() => {
    if (isLogin) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    }
  }, []);
}
