import { useEffect, useState } from "react";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto, RegisterV2SetRealNameDto } from "@tgs-web-nx/types";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import {
  InvitationType,
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
  useGenerateRegisterCreatePlayerWithSMSFormik,
} from "../../../index";
import { useNotifications } from "../../useNotifications/index";

export function useCreatePlayerStageWithSMSVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleChangeFetching } = useAuthDialog();
  const { alert } = useNotifications();
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();

  const {
    registerV2CreatePlayer,
    registerV2SetRealName,
    accountLogin,
    getAccountInfo,
    newRegister,
  } = useAccountStore();

  const {
    handleToggleLoginDialog,
    handleToggleRegisterDialog,
    securitykey,
    handleChangeSecuritykey,
    handleChangeSendCodeSuccess,
    handleChangeCountdownToken,
  } = useAuthDialog();

  const [registerError, setRegisterError] = useState<Error | null>(null);

  const checkPhoneNumber = (values: any) => {
    let res = false;
    if (
      (brandConfig[mapBrandName(config.brand)].isFixedPhoneLength &&
        values.phone.length !== config.features.MAX_PHONE_LENGTH) ||
      (values.phone.length === config.features.MAX_PHONE_LENGTH && values.phone[0] !== "0")
    ) {
      alert(
        "",
        i18n
          .t("common.noReachLength")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      );
      res = true;
    }

    if (
      (!brandConfig[mapBrandName(config.brand)].isFixedPhoneLength && values.phone.length < 8) ||
      values.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
    ) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      );
      res = true;
    }
    return res;
  };

  const createPlayer = async (values: any) => {
    const username = values.username as string;
    const userType = values.userType as InvitationType;
    const promoteCode = values.promoteCode as string;
    const createPlayerReqDto: RegisterV2CreatePlayerReqDto = {
      username,
      pwd: values.pwd as string,
      upper: userType === InvitationType.PLAYER ? promoteCode : undefined,
      invitationcode: userType === InvitationType.AGENT ? promoteCode : undefined,
      //@ts-ignore
      testplayer: config.testplayer || false,
    };
    const newRegisterResDto = await registerV2CreatePlayer(createPlayerReqDto);
    if (!newRegisterResDto) {
      throw new Error("No newRegisterResDto found");
    }

    if (!newRegisterResDto.IsSuccess) {
      alert("", ErrorSwitcher.getTranslation(newRegisterResDto.info));
      throw new Error(ErrorSwitcher.getTranslation(newRegisterResDto.info));
    }

    if (!newRegisterResDto.data.stepResponse.isnew) {
      alert("", i18n.t("common.msgAlreadyExist"));
      throw new Error(i18n.t("common.msgAlreadyExist"));
    }
  };

  const setRealName = async (values: any) => {
    const setRealNameReqDto: RegisterV2SetRealNameDto = {
      realname: values.realName,
    };
    const responseSetRealName = await registerV2SetRealName(setRealNameReqDto);
    if (!responseSetRealName?.IsSuccess) {
      handleChangeFetching(false);
      alert("", i18n.t("common.msgRequestFailed"));
      return;
    }
  };

  const sendVerificationcode = async (values: any) => {
    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: config.features.PhonePrefix,
        phone: values.phone,
      },
    });
    if (!responseInitPhone?.IsSuccess) {
      handleChangeFetching(false);
      alert("", i18n.t("common.msgRequestFailed"));
      return;
    }
    alert("", i18n.t("common.msgTokenSent"));
    handleChangeSendCodeSuccess(true);
    handleChangeSecuritykey(responseInitPhone?.data.stepResponse as any);
    handleChangeFetching(false);
  };

  const handleClickSend = async (values: any) => {
    if (checkPhoneNumber(values)) {
      return;
    }
    //讓畫面進入loading
    handleChangeFetching(true);

    try {
      //create player
      await createPlayer(values);

      //login
      await AccountService.Login(values.username, values.pwd);

      //如有開啟set real name功能,call set realName API(register)
      if (brandConfig[mapBrandName(config.brand)].isAddRealNameFieldBrand) {
        setRealName(values);
      }

      //send Verification code
      sendVerificationcode(values);
    } catch (error: any) {
      handleChangeFetching(false);
      setRegisterError(error);
    }
  };

  const handleClickResend = async (values: any) => {
    if (checkPhoneNumber(values)) {
      return;
    }
    handleChangeFetching(true);

    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: config.features.PhonePrefix,
        phone: values.phone,
      },
    });
    handleChangeFetching(false);
    if (responseInitPhone?.IsSuccess) {
      handleChangeCountdownToken(10);
      alert("", i18n.t("common.msgTokenSent"));
      handleChangeSecuritykey(responseInitPhone?.data.stepResponse as any);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickSubmit = async (values: any) => {
    if (!isConfirmedAdult) {
      setRegisterError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
      return;
    }
    if (values.verifyCode.length === 0) {
      setRegisterError(new Error(i18n.t("common.msgEnterCode")));
      return;
    }
    try {
      handleChangeFetching(true);
      const response = await AccountService.UpdatePhoneV2(securitykey, formik.values.verifyCode);
      if (response?.IsSuccess) {
        //update user info
        await accountLogin(values.username, values.pwd);
        handleToggleRegisterDialog(false);
        handleChangeSendCodeSuccess(false);
      } else {
        alert("", response?.info || "");
      }
    } catch (error: any) {
      setRegisterError(error);
    } finally {
      handleChangeFetching(false);
    }
  };

  const { formInputConfigList, formik } = useGenerateRegisterCreatePlayerWithSMSFormik({
    handleClickSubmit,
  });

  useEffect(() => {
    setRegisterError(null);
  }, [formik.errors]);

  return {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    //  confirmAdult
    isConfirmedAdult,
    handleClickConfirmAdult,
    handleClickSend,
    handleClickResend,
  };
}
