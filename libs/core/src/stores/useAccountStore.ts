import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
// import { AccountState } from "@tgs-web-nx/types";
import {
  AccountState,
  RegisterReqDto,
  RegisterV2CreatePlayerReqDto,
  RegisterV2SetRealNameDto,
} from "@tgs-web-nx/types";
import { AccountService } from "../services";
import {
  CHECKTOKEN_BEGIN,
  CHECKTOKEN_FAILURE,
  CHECKTOKEN_SUCCESS,
  GETACCOUNT_BEGIN,
  GETACCOUNT_FAILURE,
  GETACCOUNT_SUCCESS,
  GETBALANCE_SUCCESS,
  GETIDCARDNO_BEGIN,
  GETIDCARDNO_FAILURE,
  GETIDCARDNO_SUCCESS,
  GETPROMOTEBILL_SUCCESS,
  GETPROMOTEUSER_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_BEGIN,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  RESET_ACCOUNTRESULT,
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
} from "../api-services/constant/actionType";
import { isMobileOnly } from "react-device-detect";

export function useAccountStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const account: AccountState = useSelector((state) => state.account);

  // Action Creators
  const updateMemberCardNo = useCallback(async (name: string, number: string) => {
    dispatch({
      type: UPDATECARDNO_BEGIN,
      loading: true,
    });
    try {
      const response = await AccountService.AddRealName(name, number);

      if (response?.IsSuccess) {
        dispatch({
          type: UPDATECARDNO_SUCCESS,
          payload: {
            IsSuccess: true,
            member_name: name,
            check_pass_account: true,
          },
          loading: false,
        });
      } else {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (e: any) {
      dispatch({
        type: UPDATECARDNO_FAILURE,
        payload: e.status,
        loading: false,
      });
    }
  }, []);

  const accountLogin = useCallback(async (username: string, password: string) => {
    dispatch({
      type: LOGIN_BEGIN,
      loading: true,
    });
    try {
      const response = await AccountService.Login(username, password);
      if (response?.IsSuccess) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
          loading: false,
        });
        localStorage.setItem("session", response.data.session);

      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (e: any) {
      dispatch({
        type: UPDATECARDNO_FAILURE,
        payload: e.status,
        loading: false,
      });
    }
  }, []);

  const accountLoginGoogle = useCallback(async (token: string) => {
    dispatch({
      type: LOGIN_BEGIN,
      loading: true,
    });
    try {
      const response = await AccountService.LoginGoogle(token);
      if (response?.IsSuccess) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (e: any) {
      dispatch({
        type: UPDATECARDNO_FAILURE,
        payload: e.status,
        loading: false,
      });
    }
  }, []);

  const accountLogout = useCallback(async (token: string) => {
    dispatch({
      type: LOGOUT_BEGIN,
      loading: true,
    });
    const response = await AccountService.Logout();

    if (response?.IsSuccess) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response,
        loading: false,
      });

      localStorage.removeItem("session");
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: response,
        loading: false,
      });
    }

    return response;
  }, []);

  const checkTokenIsValid = useCallback(async () => {
    dispatch({
      type: CHECKTOKEN_BEGIN,
      loading: true,
    });

    try {
      if (!localStorage.getItem("token" + (isMobileOnly ? 1 : 0))) {
        dispatch({
          type: CHECKTOKEN_FAILURE,
          payload: "",
          loading: false,
        });
        return
      };
      const response = await AccountService.GetMemberInfo();

      if (response?.IsSuccess) {
        dispatch({
          type: CHECKTOKEN_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        localStorage.removeItem("token");

        dispatch({
          type: CHECKTOKEN_FAILURE,
          payload: response,
          loading: false,
        });
      }

      return response;
    } catch (error: any) {
      dispatch({
        type: CHECKTOKEN_FAILURE,
        payload: error,
        loading: false,
      });
    }
  }, []);

  const getAccountInfo = useCallback(async () => {
    dispatch({
      type: GETACCOUNT_BEGIN,
      loading: true,
    });
    try {
      // @ts-ignore
      const result = await AccountService.GetMemberInfo();

      if (result.IsSuccess) {
        dispatch({
          type: GETACCOUNT_SUCCESS,
          payload: result,
          loading: true,
        });
      } else {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: result,
          loading: false,
        });
      }

      return result;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const getAccountProfile = useCallback(async (showVip: boolean) => {
    try {
      const response = await AccountService.GetMemberInfo();
      // response.data.identityauthentication = true;

      if (response?.IsSuccess) {
        dispatch({
          type: showVip ? GETACCOUNT_SUCCESS : GETBALANCE_SUCCESS,
          payload: response,
          loading: false,
        });
      } else {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: response,
          loading: false,
        });
      }
      return response;
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const registerAccount = useCallback(
    async ({ username, pwd, confirmpwd, invitationcode, upper }: RegisterReqDto) => {
      try {
        return await AccountService.Register(username, pwd, confirmpwd, invitationcode, upper);
      } catch (e: any) {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: e,
          loading: false,
        });

        throw e;
      }
    },
    [],
  );

  const getIDCardNo = useCallback(async () => {
    dispatch({
      type: GETIDCARDNO_BEGIN,
      loading: true,
    });
    try {
      const result = await AccountService.GetIDCardNo();
      if (result.IsSuccess) {
        dispatch({
          type: GETIDCARDNO_SUCCESS,
          payload: result,
          loading: true,
        });
      } else {
        dispatch({
          type: GETIDCARDNO_FAILURE,
          payload: result,
          loading: false,
        });
      }

      return result;
    } catch (e: any) {
      dispatch({
        type: GETIDCARDNO_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const getPromoteUserList = useCallback(async (limit: number, page: number) => {
    const result = await AccountService.GetPromoteUser(page, limit);

    if (result.IsSuccess) {
      dispatch({
        type: GETPROMOTEUSER_SUCCESS,
        payload: result,
        isNew: page === 0,
      });
      return result;
    }
  }, []);

  const getPromoteBillList = useCallback(async (limit: number, page: number) => {
    const result = await AccountService.GetPromoteBill(page, limit);

    if (result.IsSuccess) {
      dispatch({
        type: GETPROMOTEBILL_SUCCESS,
        payload: result,
        isNew: page === 0,
      });
    }

    return result;
  }, []);

  const getRegisterStatus = useCallback(async () => {
    try {
      return await AccountService.GetRegisterStatus();
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const newRegister = useCallback(async (type: string, input: any) => {
    try {
      return await AccountService.NewRegister(type, input);
    } catch (e: any) {
      dispatch({
        type: GETACCOUNT_FAILURE,
        payload: e,
        loading: false,
      });
    }
  }, []);

  const performUpdateMemberNameAndIC = useCallback(
    async (name: string, number: string, file: File) => {
      dispatch({
        type: UPDATECARDNO_BEGIN,
        loading: true,
      });
      try {
        const result = await AccountService.UpdateMemberNameAndIC(name, number, file);

        if (result.IsSuccess) {
          dispatch({
            type: UPDATECARDNO_SUCCESS,
            payload: {
              IsSuccess: true,
              member_name: name,
              check_pass_account: true,
            },
            loading: false,
          });
        } else {
          dispatch({
            type: UPDATECARDNO_FAILURE,
            payload: result,
            loading: false,
          });
        }
        return result;
      } catch (e: any) {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      }
    },
    [],
  );

  const resetAccountResult = useCallback(() => {
    dispatch({
      type: RESET_ACCOUNTRESULT,
    });
  }, []);

  const registerV2CreatePlayer = useCallback(
    async (createPlayerReqDto: RegisterV2CreatePlayerReqDto) => {
      try {
        return await AccountService.RegisterV2CreatePlayer(createPlayerReqDto);
      } catch (e: any) {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: e,
          loading: false,
        });
      }
    },
    [],
  );

  const registerV2SetRealName = useCallback(
    async (registerV2SetRealNameDto: RegisterV2SetRealNameDto) => {
      try {
        return await AccountService.registerV2SetRealName(registerV2SetRealNameDto);
      } catch (e: any) {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: e,
          loading: false,
        });
      }
    },
    [],
  );

  return {
    account,
    updateMemberCardNo,
    accountLogin,
    accountLoginGoogle,
    accountLogout,
    checkTokenIsValid,
    getAccountInfo,
    getAccountProfile,
    registerAccount,
    getIDCardNo,
    getPromoteUserList,
    getPromoteBillList,
    getRegisterStatus,
    newRegister,
    performUpdateMemberNameAndIC,
    resetAccountResult,
    registerV2CreatePlayer,
    registerV2SetRealName,
  };
}
