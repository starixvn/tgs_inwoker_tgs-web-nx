import React, { createContext } from "react";
import { LoginState, useLogin } from "@/core/feature/useAuth/hooks/useLogin";
import { LogoutState, useLogout } from "@/core/feature/useAuth/hooks/useLogout";
import { RegisterState, useRegister } from "@/core/feature/useAuth/hooks/useRegister";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { RegisterReqDto } from "@/core/types/dto/player/RegisterReqDto";
import { HomeGameContext } from "@/core/feature/game/contexts/homeGameContext";

export const initialState: {
  loginState: LoginState;
  logoutState: LogoutState;
  registerState: RegisterState;
  handleLogin: (username: string, password: string, needToRemember?: boolean) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (registerReqDto: RegisterReqDto) => Promise<void>;
  isLogin: boolean;
  isAuthLoading: boolean;
} = {
  loginState: {
    data: null,
    isLoading: false,
    error: null,
  },
  logoutState: {
    data: null,
    isLoading: false,
    error: null,
  },
  registerState: {
    data: null,
    isLoading: false,
    error: null,
  },
  handleLogin: (username: string, password: string, needToRemember?: boolean) => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
  handleRegister: () => Promise.resolve(),
  isAuthLoading: false,
  isLogin: false,
};

export const AuthContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const { loginState, handleLogin } = useLogin();
  const { logoutState, handleLogout } = useLogout();
  const { registerState, handleRegister } = useRegister();
  const { account } = useAccountStore();

  const isLogin = !!account.token;

  const isAuthLoading = loginState.isLoading || logoutState.isLoading || registerState.isLoading;
  return (
    <AuthContext.Provider
      value={{
        loginState,
        handleLogin,
        logoutState,
        handleLogout,
        registerState,
        handleRegister,
        isLogin,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
