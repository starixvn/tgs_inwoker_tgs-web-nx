import React, { createContext, useEffect } from "react";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";
import { AccountInfo, Provider } from "@tgs-web-nx/types";
import { useTransferWallets } from "../hooks/useTransferWallets";
import { useMainWallet } from "../hooks/useMainWallet";
import { useAuth } from "../../useAuth";

const initialState: {
  mainWalletBalance: number;
  transferWalletBalance: number;
  fetchMainWalletBalance: () => Promise<void>;
  fetchTransferWalletBalance: () => Promise<void>;
  fetchBalance: () => Promise<void>;
  isMainWalletLoading: boolean;
  isTransferWalletLoading: boolean;
  mainSymbol: string;
  info: AccountInfo;
  providerList: Provider[];
} = {
  mainWalletBalance: 0,
  transferWalletBalance: 0,
  fetchMainWalletBalance: () => Promise.resolve(),
  fetchTransferWalletBalance: () => Promise.resolve(),
  fetchBalance: () => Promise.resolve(),
  mainSymbol: "",
  isMainWalletLoading: false,
  isTransferWalletLoading: false,
  info: {
    balance: 0,
    member_card_no: null,
    member_id: 0,
    member_level_id: 0,
    member_name: null,
    member_username: "",
    member_birthday: "",
    member_email: null,
    member_phone: null,
    member_safe_password: "",
    member_address: "",
    member_address_surename: "",
    member_address_phone: "",
    member_question: "",
    member_qq: null,
    member_wechat: null,
    member_zalo: null,
    member_fb: null,
    member_telegram: null,
    member_line: null,
    member_viber: null,
    member_whatsapp: null,
    can_withdrawal: "",
    bonus_num: "",
    message_num: 0,
    check_pass_account: false,
    check_pass_email: false,
    check_pass_phone: false,
    promote_code: "",
    promote_url: "",
    month_vip: {
      id: 0,
      curr_title: "",
      curr_owned_point: "",
      next_title: "",
      next_point: "",
      require_point: "",
      vip_progress_bar: 0,
    },
    year_vip: {
      id: 0,
      curr_title: "",
      curr_owned_point: "",
      next_title: "",
      next_point: "",
      require_point: "",
      vip_progress_bar: 0,
    },
    token: "",
    logintime: "",
    member_last_login: "",
    member_birthdate: null,
    playercode: "",
    identityformstatus: 0,
    identityformid: "",
    bankInfoAuthentication: false,
    pending: false,
    updateCardResult: null,
    member: "",
    vip_progress_bar: 0,
    accumdeposit: 0,
    accumturnover: 0,
    levelupaccumulatebetamount: 0,
    levelupaccumulatedeposit: 0,
    fulllevel: false,
  } as AccountInfo,
  providerList: [],
};

export const UserWalletInfoContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const UserWalletInfoContextProvider = ({ children }: ProviderProps) => {
  const { game } = useGameStore();
  const { isLogin } = useAuth();
  const {
    account: { info, registercompleted },
  } = useAccountStore();
  const {
    mainWalletBalance,
    fetchMainWalletBalance,
    mainSymbol,
    isLoading: isMainWalletLoading,
  } = useMainWallet();
  const {
    transferWalletBalance,
    fetchTransferWalletBalance,
    isLoading: isTransferWalletLoading,
    providerList,
  } = useTransferWallets();

  useEffect(() => {
    if (!isLogin) return;
    if (!registercompleted) return;
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.providerList.length, isLogin, registercompleted]);

  const fetchBalance = async () => {
    const promiseList = [fetchMainWalletBalance(), fetchTransferWalletBalance()];
    await Promise.all(promiseList);
  };

  // const handleRefreshClick = async () => {
  //   if (config.features.ForceRedirectAddCard && !info.bankInfoAuthentication) {
  //     return;
  //   }
  //
  //   await fetchBalance();
  // };

  return (
    <UserWalletInfoContext.Provider
      value={{
        mainSymbol,
        mainWalletBalance,
        transferWalletBalance,
        fetchMainWalletBalance,
        fetchTransferWalletBalance,
        fetchBalance,
        info,
        providerList,
        isMainWalletLoading,
        isTransferWalletLoading,
      }}
    >
      {children}
    </UserWalletInfoContext.Provider>
  );
};
