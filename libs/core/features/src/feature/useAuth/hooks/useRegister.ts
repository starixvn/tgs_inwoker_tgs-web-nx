import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { RegisterReqDto, RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { useAccountStore } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

export type RegisterState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useRegister() {
  const [registerState, setRegisterState] = useState<RegisterState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const accountStore = useAccountStore();
  const { handleChangeGameType } = useHomeGameContext();

  const handleRegister = useCallback(async (registerReqDto: RegisterReqDto) => {
    try {
      setRegisterState((prevState) => ({ ...prevState, isLoading: true, error: null }));

      const registerResDto = await accountStore.registerAccount(registerReqDto);

      if (!registerResDto.IsSuccess) {
        throw new Error(ErrorSwitcher.getTranslation(registerResDto.info));
      }

      if (!registerResDto.data.isnew) {
        throw new Error(i18n.t("common.msgAlreadyExist"));
      }

      //TODO: register workflow
      // const {username,pwd} = registerReqDto
      // if (config.features.SMSVerification) {
      //
      //   props.onRegisterSuccess(username, password);
      // } else if (
      //   config.features.Register_ShowEmail &&
      //   config.features.Register_ShowPhone
      // ) {
      //   props.doLoginWithHpEmail(username, password, phone, email);
      // } else if (config.features.Register_ShowPhone) {
      //   props.doLoginWithHp(username, password, phone);
      // } else {
      //   props.doLogin(username, password);
      // }

      setRegisterState({
        isLoading: false,
        data: registerResDto.data,
        error: null,
      });
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
    } catch (error: any) {
      setRegisterState({
        isLoading: false,
        data: null,
        error: error,
      });

      if (error.message === "banned") {
        history.push("/banned");
      }

      throw error;
    }
  }, []);

  const clearRegisterError = useCallback(() => {
    setRegisterState({
      isLoading: false,
      data: null,
      error: null,
    });
  }, []);

  return {
    registerState,
    handleRegister,
    clearRegisterError,
  };
}
