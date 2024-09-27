import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AccountService,
  useAccountStore,
  useGeneralStore,
  useInboxStore,
  useWalletStore,
} from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GetBankCardListResDto } from "@tgs-web-nx/types";
import { enqueueSnackbar } from "notistack";
import { useAuthDialog } from "../../useAuthDialog";
import { useHomeGameContext } from "../../game/useHomeGameContext";
import { useTransferWallets } from "../../useUserWalletInfo/hooks/useTransferWallets";

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
  const { accountLogin, accountLoginGoogle, getAccountInfo } = useAccountStore();
  const walletStore = useWalletStore();
  const inboxStore = useInboxStore();
  const generalStore = useGeneralStore();
  const { updateStage } = useAuthDialog();
  const { handleChangeGameType } = useHomeGameContext();
  const { fetchTransferWalletBalance } = useTransferWallets();

  useEffect(() => {
    if (loginState.data) {
      fetchTransferWalletBalance();
    }
  }, [loginState]);

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

  const handleLoginGoogle = async (token: string) => {
    try {
      setLoginState({ isLoading: true, data: null, error: null });

      const result = await accountLoginGoogle(token);

      if (!result?.IsSuccess) {
        handleLoginFailure(result?.code);
      } else {
        // validate if register completed
        const isRegisterStateComplete = await examineRegisterStatus("");
        if (!isRegisterStateComplete) {
          setLoginState({
            isLoading: false,
            data: null,
            error: null,
          });
          return;
        }

        await handleLoginSuccess("", false);
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
      enqueueSnackbar(i18n.t("common.msgInvalidUsername"), {
        variant: "error",
      });
      throw new Error("");
      //   throw new Error(i18n.t("common.msgInvalidUsername"));
    }
  };

  const handleLoginSuccess = async (username: string, needToRemember?: boolean) => {
    const inBlackList = await isInBlackList();
    if (!inBlackList) {
      await fetchData();
      handleLocalStorage(needToRemember || false, username);
    }
  };

  const examineRegisterStatus = async (username: string) => {
    const response = await getAccountInfo();
    if (response?.data?.registercompleted) return true;

    const res = await AccountService.RegisterV2GetRegisterStep();
    const nextStep = res.data;
    updateStage(nextStep);

    return false;
  };

  const isInBlackList = async () => {
    let result = false;
    //判斷玩家是否為黑名單是依據後端API回傳code為210及errmsgid為AccessDenied
    //註1:walletStore.getBankCardList()以此API當作判斷是否為黑名單
    //註2:因在此呼叫getBankCardList()了,因此在fetchData函式就不再call一次
    const response = (await walletStore.getBankCardList()) as GetBankCardListResDto;
    if (response.code === 210) {
      result = true;
    }
    return result;
  };

  const fetchData = async () => {
    const promiseList = [
      inboxStore.getMessages(i18n.language, 1, 99),
      generalStore.getPromotion(),
      //generalStore.getPromotionRouletteCount(),
    ];
    await Promise.all(promiseList);

    /*
     * NOTE: requests below took so much time that would cause login progress too slow
     * so I pull them out from Promise.all()
     * however, if user enter correspond page(ex: transfer page)
     * the response will cause page or some component rerender due to store.state changed
     * it's a dilemma for "login fast" vs "stability in certain page"
     * */

    walletStore.getWithdrawalChannel();
    //已經在判斷玩家函式就呼叫,這邊就不重複call API
    // walletStore.getBankCardList();
    walletStore.getBalanceList();
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
    handleChangeGameType(GameTypeEnum.NONE);
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
    handleLoginGoogle,
    clearLoginError,
  };
}
