import React, { createContext, useEffect, useState } from "react";
import { RegisterStageEnum, ValueOf } from "@tgs-web-nx/types";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { useRegisterV2Dialog } from "../hooks/useRegisterV2Dialog";
import { useAuthV1Dialog } from "../hooks/useAuthV1Dialog";
import { useAuth, useAuthContext } from "../../useAuth";

const initialState: {
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
  isForgotPasswordDialogOpen: boolean;
  handleToggleLoginDialog: (isOpen?: boolean) => void;
  handleToggleRegisterDialog: (isOpen?: boolean) => void;
  handleToggleForgotPasswordDialog: (isOpen?: boolean) => void;
  // register v2
  updateStage: (newStage: ValueOf<typeof RegisterStageEnum>) => void;
  isRegisterV2InitPhoneDialogOpen: boolean;
  handleToggleInitPhoneDialog: (isOpen?: boolean) => void;
  isRegisterV2InitEmailDialogOpen: boolean;
  handleToggleInitEmailDialog: (isOpen?: boolean) => void;
  isRegisterV2SetRealNameDialogOpen: boolean;
  handleToggleSetRealNameDialog: (isOpen?: boolean) => void;
  isfetching: boolean | undefined;
  handleChangeFetching: (value?: boolean | undefined) => void;
} = {
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  isForgotPasswordDialogOpen: false,
  handleToggleLoginDialog: () => {},
  handleToggleRegisterDialog: () => {},
  handleToggleForgotPasswordDialog: () => {},
  // register v2
  updateStage: () => {},
  isRegisterV2InitPhoneDialogOpen: false,
  handleToggleInitPhoneDialog: () => {},
  isRegisterV2InitEmailDialogOpen: false,
  handleToggleInitEmailDialog: () => {},
  isRegisterV2SetRealNameDialogOpen: false,
  handleToggleSetRealNameDialog: () => {},
  isfetching: false,
  handleChangeFetching: () => {},
};

export const AuthDialogContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthDialogContextProvider = ({ children }: ProviderProps) => {
  const {
    isLoginDialogOpen,
    isRegisterDialogOpen,
    isForgotPasswordDialogOpen,
    handleToggleLoginDialog,
    handleToggleRegisterDialog,
    handleToggleForgotPasswordDialog,
    isfetching,
    handleChangeFetching,
  } = useAuthV1Dialog();
  const { getAccountInfo } = useAccountStore();
  const { isLogin } = useAuth();

  useEffect(() => {
    const examineRegisterStatus = async () => {
      if (!isLogin) return;

      const response = await getAccountInfo();
      if (response?.data?.registercompleted) return;

      const res = await AccountService.RegisterV2GetRegisterStep();
      const nextStep = res.data;
      updateStage(nextStep);
    };

    examineRegisterStatus();
  }, [getAccountInfo, isLogin]);

  const updateStage = (newStage: ValueOf<typeof RegisterStageEnum>) => {
    console.log(newStage);
    switch (newStage) {
      case RegisterStageEnum.InitPhone:
        handleToggleLoginDialog(false);
        //todo:加判斷是否開關
        handleToggleRegisterDialog(true);
        handleToggleInitEmailDialog(false);
        handleToggleInitPhoneDialog(false);
        //
        break;

      case RegisterStageEnum.InitEmail:
        handleToggleLoginDialog(false);
        handleToggleRegisterDialog(false);
        handleToggleInitPhoneDialog(false);

        handleToggleInitEmailDialog(true);
        break;
      case RegisterStageEnum.SetRealName:
        handleToggleLoginDialog(false);
        handleToggleRegisterDialog(false);
        handleToggleInitPhoneDialog(false);

        handleToggleSetRealNameDialog(true);
        break;

      default:
        break;
    }
  };

  const {
    isRegisterV2InitEmailDialogOpen,
    isRegisterV2InitPhoneDialogOpen,
    isRegisterV2SetRealNameDialogOpen,
    handleToggleInitEmailDialog,
    handleToggleInitPhoneDialog,
    handleToggleSetRealNameDialog,
  } = useRegisterV2Dialog();

  return (
    <AuthDialogContext.Provider
      value={{
        isLoginDialogOpen,
        isRegisterDialogOpen,
        isForgotPasswordDialogOpen,
        handleToggleLoginDialog,
        handleToggleRegisterDialog,
        handleToggleForgotPasswordDialog,
        // register v2
        updateStage,
        isRegisterV2InitPhoneDialogOpen,
        handleToggleInitPhoneDialog,
        isRegisterV2InitEmailDialogOpen,
        handleToggleInitEmailDialog,
        isRegisterV2SetRealNameDialogOpen,
        handleToggleSetRealNameDialog,
        //fetching
        isfetching,
        handleChangeFetching,
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
