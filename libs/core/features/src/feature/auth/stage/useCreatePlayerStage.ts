import { useEffect, useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import {
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
  usePromotionCode,
  UserTypeEnum,
} from "../../../index";

export function useCreatePlayerStage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { registerV2CreatePlayer } = useAccountStore();
  const { promotionData } = usePromotionCode();
  const { handleToggleLoginDialog, handleToggleRegisterDialog, updateStage } = useAuthDialog();

  const [registerError, setRegisterError] = useState<Error | null>(null);

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

      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
      handleToggleRegisterDialog(false);
      handleToggleLoginDialog(true);

      // updateStage(newRegisterResDto.data.nextStepType);
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
