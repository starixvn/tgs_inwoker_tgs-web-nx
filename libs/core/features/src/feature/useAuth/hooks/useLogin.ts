import { useCallback, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import {
  AccountService,
  useAccountStore,
  useGeneralStore,
  useInboxStore,
  useWalletStore,
} from "@tgs-web-nx/core";
import { useAuthDialog } from "../../useAuthDialog";

export type LoginState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useLogin() {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const location = useLocation();
  const { accountLogin, getAccountInfo } = useAccountStore();
  const walletStore = useWalletStore();
  const inboxStore = useInboxStore();
  const generalStore = useGeneralStore();
  const { updateStage } = useAuthDialog();

  const handleLogin = async (username: string, password: string, needToRemember?: boolean) => {
    try {
      setLoginState({ isLoading: true, data: null, error: null });

      const result = await accountLogin(username, password);

      if (!result?.IsSuccess) {
        handleLoginFailure(result?.code);
      } else {
        // validate if register completed
        const isRegisterStateComplete = await examineRegisterStatus(username);
        if (!isRegisterStateComplete) {
          setLoginState({
            isLoading: false,
            data: null,
            error: null,
          });
          return;
        }

        await handleLoginSuccess(username, needToRemember);
        setLoginState({
          isLoading: false,
          data: result,
          error: null,
        });
      }
    } catch (error: any) {
      handleLoginError(error);
      throw error;
    }
  };

  const handleLoginFailure = (code: number | undefined) => {
    if (code === 210) {
      throw new Error("banned");
    } else {
      throw new Error(i18n.t("common.msgInvalidUsername"));
    }
  };

  const handleLoginSuccess = async (username: string, needToRemember?: boolean) => {
    await fetchData();
    handleLocalStorage(needToRemember || false, username);

    // handle return url
    const urlParams = new URLSearchParams(location.search);
    const returnUrl = urlParams.get("return_url");
    if (returnUrl) {
      return history.push(returnUrl);
    }

    redirectToHome();
  };

  const examineRegisterStatus = async (username: string) => {
    const response = await getAccountInfo();
    if (response.data.registercompleted) return true;

    const res = await AccountService.RegisterV2GetRegisterStep();
    const nextStep = res.data;
    updateStage(nextStep);

    return false;
  };

  const fetchData = async () => {
    const promiseList = [
      walletStore.getBalanceList(),
      inboxStore.getMessages(i18n.language, 1, 99),
      walletStore.getBankCardList(),
      generalStore.getPromotion(),
      generalStore.getPromotionRouletteCount(),
      walletStore.getWithdrawalChannel(),
    ];
    await Promise.all(promiseList);
  };

  const handleLocalStorage = (needToRemember: boolean, username: string) => {
    if (needToRemember) {
      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("remember");
      localStorage.removeItem("username");
    }
  };

  const redirectToHome = () => {
    history.push("/");
  };

  const handleLoginError = (error: Error) => {
    setLoginState({
      isLoading: false,
      data: null,
      error: error,
    });

    if (error.message === "banned") {
      history.push("/banned");
    }
  };

  const clearLoginError = useCallback(() => {
    setLoginState({
      isLoading: false,
      data: null,
      error: null,
    });
  }, []);

  return {
    loginState,
    handleLogin,
    clearLoginError,
  };
}
