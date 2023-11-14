import React, { createContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { usePageName } from "../../usePageName";

const initialState: {
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
  isForgotPasswordDialogOpen: boolean;
  handleToggleLoginDialog: (isOpen?: boolean) => void;
  handleToggleRegisterDialog: (isOpen?: boolean) => void;
  handleToggleForgotPasswordDialog: (isOpen?: boolean) => void;
} = {
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  isForgotPasswordDialogOpen: false,
  handleToggleLoginDialog: () => {},
  handleToggleRegisterDialog: () => {},
  handleToggleForgotPasswordDialog: () => {},
};

export const AuthDialogContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthDialogContextProvider = ({ children }: ProviderProps) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] = useState(false);
  const history = useHistory();
  const { updatePageName } = usePageName();
  const location = history.location;

  const handleToggleLoginDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen === "undefined") {
      setIsLoginDialogOpen((prevState) => !prevState);
    } else {
      setIsLoginDialogOpen(isOpen);

      if (isOpen) {
        updatePageName(i18n.t("common.login"));
      }
    }

    if (location.pathname === "/login" && !isOpen) {
      history.push("/");
    }
  }, []);

  const handleToggleRegisterDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen === "undefined") {
      setIsRegisterDialogOpen((prevState) => !prevState);
    } else {
      setIsRegisterDialogOpen(isOpen);

      if (isOpen) {
        updatePageName(i18n.t("common.register"));
      }
    }

    if (location.pathname === "/register" && !isOpen) {
      history.push("/");
    }
  }, []);

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
        history.push("/");
      }
    },
    [history, location.pathname, updatePageName],
  );

  return (
    <AuthDialogContext.Provider
      value={{
        isLoginDialogOpen,
        isRegisterDialogOpen,
        isForgotPasswordDialogOpen,
        handleToggleLoginDialog,
        handleToggleRegisterDialog,
        handleToggleForgotPasswordDialog,
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
