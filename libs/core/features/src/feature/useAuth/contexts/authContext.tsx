import React, { createContext } from "react";
import { RegisterReqDto } from "@tgs-web-nx/types";
import { useAccountStore } from "@tgs-web-nx/core";
import { LoginState, useLogin } from "../hooks/useLogin";
import { LogoutState, useLogout } from "../hooks/useLogout";
import { RegisterState, useRegister } from "../hooks/useRegister";

const initialState: {
  loginState: LoginState;
  logoutState: LogoutState;
  registerState: RegisterState;
  handleLogin: (username: string, password: string, needToRemember?: boolean) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (registerReqDto: RegisterReqDto) => Promise<void>;
  isLogin: boolean;
  isAuthLoading: boolean;
  clearLoginError: () => void;
  clearRegisterError: () => void;
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
  clearLoginError: () => {},
  clearRegisterError: () => {},
};

export const AuthContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const { loginState, handleLogin, clearLoginError } = useLogin();
  const { logoutState, handleLogout } = useLogout();
  const { registerState, handleRegister, clearRegisterError } = useRegister();
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
        clearLoginError,
        clearRegisterError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = AuthContext.Consumer;
