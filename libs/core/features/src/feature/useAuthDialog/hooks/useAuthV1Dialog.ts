import { useHistory } from "react-router-dom";
import { useCallback, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { usePageName } from "../../usePageName/index";
import { useHomeGameContext } from "../../game/useHomeGameContext";

export function useAuthV1Dialog() {
  const history = useHistory();
  const { updatePageName } = usePageName();
  const location = history.location;
  const { handleChangeGameType } = useHomeGameContext();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] = useState(false);
  const [isfetching, setIsfetching] = useState<boolean | undefined>(false);

  const handleToggleLoginDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsLoginDialogOpen((prevState) => !prevState);
      } else {
        setIsLoginDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("common.login"));
        }
      }

      if (location.pathname === "/login" && !isOpen) {
        handleChangeGameType(GameTypeEnum.NONE);
        history.push("/");
      }
    },
    [history, location.pathname, updatePageName],
  );

  const handleToggleRegisterDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsRegisterDialogOpen((prevState) => !prevState);
      } else {
        setIsRegisterDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("common.register"));
        }
      }

      if (
        (location.pathname.includes("/register") ||
          location.pathname.includes("/a/") ||
          location.pathname.includes("/p/")) &&
        !isOpen
      ) {
        handleChangeGameType(GameTypeEnum.NONE);
        history.push("/");
      }
    },
    [history, location.pathname, updatePageName],
  );

  const handleToggleForgotPasswordDialog = useCallback(
    (isOpen?: boolean) => {
      if (typeof isOpen === "undefined") {
        setIsForgotPasswordDialogOpen((prevState) => !prevState);
      } else {
        setIsForgotPasswordDialogOpen(isOpen);

        if (isOpen) {
          updatePageName(i18n.t("forgotPassword.title"));
        }
      }

      if (location.pathname === "/forgot-password" && !isOpen) {
        handleChangeGameType(GameTypeEnum.NONE);
        history.push("/");
      }
    },
    [history, location.pathname, updatePageName],
  );

  const handleChangeFetching = (value: boolean | undefined) => {
    setIsfetching(value);
  };

  return {
    isLoginDialogOpen,
    isRegisterDialogOpen,
    isForgotPasswordDialogOpen,
    handleToggleLoginDialog,
    handleToggleRegisterDialog,
    handleToggleForgotPasswordDialog,
    isfetching,
    handleChangeFetching,
  };
}
