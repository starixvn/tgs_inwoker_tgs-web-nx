import { useEffect, useState } from "react";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto, RegisterV2SetRealNameDto } from "@tgs-web-nx/types";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import {
  InvitationType,
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerWithSMSFormik,
} from "../../../index";
import { useNotifications } from "../../useNotifications/index";
import { boolean } from "yup";

export function useCreatePlayerStageWithSMSVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleChangeFetching } = useAuthDialog();
  const { alert } = useNotifications();
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();

  const { registerV2CreatePlayer, registerV2SetRealName, accountLogin, newRegister } =
    useAccountStore();

  const {
    handleToggleRegisterDialog,
    securitykey,
    handleChangeSecuritykey,
    handleChangeSendCodeSuccess,
    handleChangeCountdownToken,
  } = useAuthDialog();

  const [registerError, setRegisterError] = useState<Error | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      (!brandConfig[mapBrandName(config.brand)].isFixedPhoneLength &&
        values.phone.length > (config.features.MAX_PHONE_LENGTH || 10))
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendVerificationcode = async (values: any) => {
    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: values.areaCode,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChangeSecuritykey(responseInitPhone?.data.stepResponse as any);
    handleChangeFetching(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickSend = async (values: any) => {
    console.log(values);
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
      // 檢查phone number是否被使用過
      const chechPhoneRes = (await AccountService.checkPhoneDuplicate(
        values.areaCode,
        values.phone,
      )) as any;
      console.log(chechPhoneRes);

      if (!chechPhoneRes.data) {
        //如有開啟set real name功能,call set realName API(register)
        if (brandConfig[mapBrandName(config.brand)].isAddRealNameFieldBrand) {
          await setRealName(values);
        }
        //send Verification code
        sendVerificationcode(values);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else {
        alert("", i18n.t("common.msgTokenSent"));
      }
    } catch (error: any) {
      handleChangeFetching(false);
      setRegisterError(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickResend = async (values: any) => {
    if (checkPhoneNumber(values)) {
      return;
    }
    handleChangeFetching(true);

    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: values.areaCode,
        phone: values.phone,
      },
    });
    handleChangeFetching(false);
    if (responseInitPhone?.IsSuccess) {
      handleChangeCountdownToken(config.features.sendSMSInterval);
      alert("", i18n.t("common.msgTokenSent"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
