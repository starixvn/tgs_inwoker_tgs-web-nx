import React, { createContext, useEffect, useState } from "react";
import { RegisterStageEnum, ValueOf } from "@tgs-web-nx/types";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { useRegisterV2Dialog } from "../hooks/useRegisterV2Dialog";
import { useAuthV1Dialog } from "../hooks/useAuthV1Dialog";
import { useAuth } from "../../useAuth";

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
  } = useAuthV1Dialog();
  const { accountLogin, getAccountInfo } = useAccountStore();
  const { isLogin } = useAuth();

  const [currentStage, setCurrentStage] = useState<ValueOf<typeof RegisterStageEnum>>(
    RegisterStageEnum.CreatePlayer,
  );

  useEffect(() => {
    const examineRegisterStatus = async (username: string) => {
      if (!isLogin) return;

      const response = await getAccountInfo();
      if (response.data.registercompleted) return;

      const res = await AccountService.RegisterV2GetRegisterStep();
      const nextStep = res.data;
      updateStage(nextStep);
    };

    examineRegisterStatus();
  }, [getAccountInfo, isLogin]);

  const updateStage = (newStage: ValueOf<typeof RegisterStageEnum>) => {
    console.log(newStage);
    setCurrentStage(newStage);
    switch (newStage) {
      case RegisterStageEnum.InitPhone:
        handleToggleLoginDialog(false);
        handleToggleRegisterDialog(false);
        handleToggleInitEmailDialog(false);

        handleToggleInitPhoneDialog(true);
        break;

      case RegisterStageEnum.InitEmail:
        handleToggleLoginDialog(false);
        handleToggleRegisterDialog(false);
        handleToggleInitPhoneDialog(false);

        handleToggleInitEmailDialog(true);
        break;

      default:
        break;
    }
  };

  const {
    isRegisterV2InitEmailDialogOpen,
    isRegisterV2InitPhoneDialogOpen,
    handleToggleInitEmailDialog,
    handleToggleInitPhoneDialog,
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
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
