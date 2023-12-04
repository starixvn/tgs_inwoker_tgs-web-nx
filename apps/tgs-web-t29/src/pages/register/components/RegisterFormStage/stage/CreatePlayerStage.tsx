import React, { useEffect, useState } from "react";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import {
  useAuthDialog,
  useConfirmAdult,
  useGenerateRegisterCreatePlayerFormik,
  usePromotionCode,
  UserTypeEnum,
} from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  margin: 24px 0 0;
  display: flex;
  align-items: start;
`;

const CreatePlayerStage = () => {
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

      if (!newRegisterResDto.IsSuccess) {
        throw new Error(ErrorSwitcher.getTranslation(newRegisterResDto.info));
      }

      if (!newRegisterResDto.data.stepResponse.isnew) {
        throw new Error(i18n.t("common.msgAlreadyExist"));
      }

      if (newRegisterResDto.data.isCompleted) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", username);
        handleToggleRegisterDialog(false);
        handleToggleLoginDialog(true);
      }

      updateStage(newRegisterResDto.data.nextStepType);
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

  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={registerError}
      buttonText={i18n.t("createaccount")}
    >
      <VerifyAgeContainer>
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />
        {i18n.t("web.register.contract")}
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
