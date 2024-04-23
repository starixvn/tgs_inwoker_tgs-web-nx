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
  } = useAuthDialog();

  const [registerError, setRegisterError] = useState<Error | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickSubmit = async (values: any) => {
    console.log(values);
    if (!isConfirmedAdult) {
      setRegisterError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
      return;
    }
    if (values.verifyCode.length === 0) {
      setRegisterError(new Error(i18n.t("common.msgEnterCode")));
      return;
    }
    try {
      console.log(securitykey);
      handleChangeFetching(true);
      const response = await AccountService.UpdatePhoneV2(securitykey, formik.values.verifyCode);
      if (response?.IsSuccess) {
        // handleChangeFetching(false);
        handleToggleRegisterDialog(false);
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

  const handleClickSend = async (values: any) => {
    handleChangeFetching(true);
    try {
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
      await accountLogin(values.username, values.pwd);

      const responseInitPhone = await newRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: config.features.PhonePrefix,
          phone: values.phone,
        },
      });
      alert("", i18n.t("common.msgTokenSent"));
      handleChangeSecuritykey(responseInitPhone?.data.stepResponse as any);
      handleChangeFetching(false);
    } catch (error: any) {
      handleChangeFetching(false);
      setRegisterError(error);
    }
  };

  const handleClickResend = async (values: any) => {
    handleChangeFetching(true);

    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: config.features.PhonePrefix,
        phone: values.phone,
      },
    });
    alert("", i18n.t("common.msgTokenSent"));
    handleChangeSecuritykey(responseInitPhone?.data.stepResponse as any);
    handleChangeFetching(false);
  };

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
