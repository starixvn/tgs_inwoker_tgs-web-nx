import React, { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useConfirmAdult, useGenerateRegisterFormik } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { RegisterV2CreatePlayerReqDto, ValueOf } from "@tgs-web-nx/types";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { RegisterStageEnum } from "@/pages/register/components/RegisterFormStage/types";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  margin: 24px 0 0;
  display: flex;
  align-items: start;
`;

type Props = {
  updateStage: (newStage: ValueOf<typeof RegisterStageEnum>) => void;
};

const CreatePlayerStage = ({ updateStage }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { registerV2CreatePlayer } = useAccountStore();

  const [registerError, setRegisterError] = useState<Error | null>(null);
  const [otherError, setOtherError] = useState<Error | null>(null);

  const handleClickSubmit = async (createPlayerReqDto: RegisterV2CreatePlayerReqDto) => {
    if (!isConfirmedAdult) {
      setOtherError(new Error(i18n.t("common.msgRegisterTermAndCondition")));
      return;
    }

    try {
      setIsLoading(true);
      console.log(createPlayerReqDto);
      const response = await registerV2CreatePlayer(createPlayerReqDto);
      console.log(response);
      updateStage("InitPhone");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { formInputConfigList, formik } = useGenerateRegisterFormik({
    handleClickSubmit,
  });

  const error = registerError || otherError;

  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={error}
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
