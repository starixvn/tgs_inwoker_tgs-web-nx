import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAccountStore } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "../../game/useHomeGameContext";

export type LogoutState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useLogout() {
  const [logoutState, setLogoutState] = useState<LogoutState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const { account, accountLogout } = useAccountStore();
  const { handleChangeGameType } = useHomeGameContext();

  const handleLogout = useCallback(async () => {
    try {
      setLogoutState((prevState) => ({ ...prevState, isLoading: true }));

      const token = account.token || "";
      if (!token) {
        console.error("No token found");
        console.error(account);
      }

      const result = await accountLogout(token);
      setLogoutState({ isLoading: false, data: result.data, error: null });
      // handleChangeGameType(GameTypeEnum.NONE);
      // history.push("/");
    } catch (error: any) {
      console.log(error);

      setLogoutState({
        isLoading: false,
        data: null,
        error: error,
      });
    }
  }, [account.token, accountLogout]);

  return {
    logoutState,
    handleLogout,
  };
}
