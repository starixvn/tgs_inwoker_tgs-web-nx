import { useEffect, useState } from "react";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto, RegisterV2SetRealNameDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import {
  UserTypeEnum,
  useAuthDialog,
  useConfirmAdult,
  usePromotionCode,
} from "@tgs-web-nx/core/features";
import { useGenerateRegisterCreatePlayerFormik } from "./useGenerateRegisterCreatePlayerFormik";

const addRealNameFieldBrand = "MOVN2";

export function useCreatePlayerStage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { registerV2CreatePlayer, registerV2SetRealName, accountLogin } = useAccountStore();
  const { promotionData } = usePromotionCode();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } = useAuthDialog();

  const [registerError, setRegisterError] = useState<Error | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickSubmit = async (values: any) => {
    if (!isConfirmedAdult) {
      setRegisterError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
      return;
    }

    try {
      setIsLoading(true);
      const username = values.username as string;
      const userType = values.userType as UserTypeEnum;
      const promoteCode = values.promoteCode as string;

      const createPlayerReqDto: RegisterV2CreatePlayerReqDto = {
        username,
        pwd: values.pwd as string,
        upper: userType === UserTypeEnum.PLAYER ? promoteCode || promotionData.upper : undefined,
        invitationcode:
          userType === UserTypeEnum.AGENT ? promoteCode || promotionData.promoId : undefined,
        //@ts-ignore
        testplayer: config.testplayer || false,
      };

      const newRegisterResDto = await registerV2CreatePlayer(createPlayerReqDto);

      if (!newRegisterResDto) {
        throw new Error("No newRegisterResDto found");
      }

      if (!newRegisterResDto.IsSuccess) {
        throw new Error(ErrorSwitcher.getTranslation(newRegisterResDto.info));
      }

      if (!newRegisterResDto.data.stepResponse.isnew) {
        throw new Error(i18n.t("common.msgAlreadyExist"));
      }
      //for MOVN2 customization
      if (addRealNameFieldBrand === config.brand) {
        //Set realname之前必須先login
        await accountLogin(values.username, values.pwd);
        const setRealNameReqDto: RegisterV2SetRealNameDto = {
          realname: values.realName,
        };
        await registerV2SetRealName(setRealNameReqDto);
      }

      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
      handleToggleRegisterDialog(false);
      handleToggleLoginDialog(true);

      // updateStage(newRegisterResDto.data.nextStepType);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setRegisterError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { formInputConfigList, formik } = useGenerateRegisterCreatePlayerFormik({
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
  };
}
