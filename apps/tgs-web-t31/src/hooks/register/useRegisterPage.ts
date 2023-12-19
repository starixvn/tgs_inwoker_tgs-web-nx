import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import {
  useAuth,
  useAuthDialog,
  useHomeGameContext,
  useRegisterForm,
  useUpdatePageName,
} from "@tgs-web-nx/core/features";
import { useParams } from "react-router";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";

export function useRegisterPage() {
  useUpdatePageName(i18n.t("common.register"));
  const history = useHistory();
  const { isLogin } = useAuth();
  const { isDesktopSize } = useRwd();

  const { playername } = useParams<{ playername: string }>();
  const { handleToggleRegisterDialog } = useAuthDialog();
  const { handleClickConfirmAdult } = useRegisterForm();
  const { handleChangeGameType } = useHomeGameContext();

  useEffect(() => {
    if (isLogin) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    }

    if (playername && isDesktopSize) {
      handleToggleRegisterDialog(true);
      handleClickConfirmAdult();
    }
  }, []);
}
