import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import { useAccountStore } from "@tgs-web-nx/core";
import {
  RegisterV2CreatePlayerReqDto,
  RegisterV2SetRealNameDto,
  StepStatus,
} from "@tgs-web-nx/types";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";

import { enqueueSnackbar } from "notistack";
import {
  InvitationType,
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
} from "../../..";

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
      const email = values.email as string;
      const userType = values.userType as InvitationType;
      const promoteCode = values.promoteCode as string;

      const createPlayerReqDto: RegisterV2CreatePlayerReqDto = {
        username,
        email,
        pwd: values.password as string,
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
        throw new Error(ErrorSwitcher.getTranslation(newRegisterResDto.info));
      }

      if (newRegisterResDto.data.stepResponse.stepstatus === StepStatus.UsernameExisted) {
        enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
            variant: "error",
          });
        throw new Error("")
      }

      if (newRegisterResDto.data.stepResponse.stepstatus === StepStatus.EmailExisted) {
        enqueueSnackbar(i18n.t("common.msgEmailExist"), {
            variant: "error",
          });
        throw new Error("")
      }

      if (newRegisterResDto.data.stepResponse.stepstatus === StepStatus.EmailInvalid) {
        enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
            variant: "error",
          });
        throw new Error("")
      }
      //for MOVN2 customization
      if (brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].isAddRealNameFieldBrand) {
        //Set realname之前必須先login
        await accountLogin(values.username, values.pwd);

        const setRealNameReqDto: RegisterV2SetRealNameDto = {
          realname: values.realName,
        };
        const setRealNameDto = await registerV2SetRealName(setRealNameReqDto);

        if (setRealNameDto?.data.isCompleted && handleRegisterSuccess) {
          handleRegisterSuccess();
        }

        //update user info
        await getAccountInfo();
      }

      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
      handleToggleRegisterDialog(false);

      //Set realname時已經login,不需要再彈出登入視窗
      if (!brandConfig[mapBrandName(import.meta.env.VITE_BRAND)].isAddRealNameFieldBrand) {
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
