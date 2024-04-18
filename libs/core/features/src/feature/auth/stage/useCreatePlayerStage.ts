import { useEffect, useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto, RegisterV2SetRealNameDto } from "@tgs-web-nx/types";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import {
  InvitationType,
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
} from "../../../index";

export function useCreatePlayerStage(handleRegisterSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { registerV2CreatePlayer, registerV2SetRealName, accountLogin, getAccountInfo } =
    useAccountStore();
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

      if(newRegisterResDto?.data.isCompleted && handleRegisterSuccess) {
        handleRegisterSuccess();
      } 

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
      if (brandConfig[mapBrandName(config.brand)].isAddRealNameFieldBrand) {
        //Set realname之前必須先login
        await accountLogin(values.username, values.pwd);

        const setRealNameReqDto: RegisterV2SetRealNameDto = {
          realname: values.realName,
        };
        await registerV2SetRealName(setRealNameReqDto);
        //update user info
        await getAccountInfo();
      }

      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
      handleToggleRegisterDialog(false);

      //Set realname時已經login,不需要再彈出登入視窗
      if (!brandConfig[mapBrandName(config.brand)].isAddRealNameFieldBrand) {
        handleToggleLoginDialog(true);
      }

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
