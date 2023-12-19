import { useEffect } from "react";
import { useAuth, useHomeGameContext, useUpdatePageName } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";

export function useForgotPasswordPage() {
  useUpdatePageName(i18n.t("forgotPassword.title"));

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
