import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import config from "@tgs-web-nx/config";
import {
  FormikFormInput,
  useAuthDialog,
  useCreatePlayerStageWithSMSVerify,
} from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { TextField } from "@/components/UI/TextField";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { SubmitButton as SendButton } from "@/components/styled-component/ProfileForms";

const PhoneContainer = styled.div`
  display: flex;
  overflow: visible;
  gap: 14px;
`;

const Text = styled.span`
  margin-left: 3px;
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormVerifyCodeWithNewRegisterFlow = ({ formInput, formik, showErrorOn }: Props) => {
  const { handleClickSend, handleClickResend } = useCreatePlayerStageWithSMSVerify();
  const { isSendCodeSuccess, countdownToken, handleChangeCountdownToken } = useAuthDialog();
  const { label, name, type } = formInput;

  const handleSendCode = () => {
    //觸發表單驗證
    formik.setTouched({
      username: true,
      pwd: true,
      confirmPassword: true,
      realName: true,
      phone: true,
    });
    formik.validateForm().then((errors: any) => {
      if (Object.keys(errors).length === 0) {
        handleClickSend(formik.values);
      }
    });
  };

  const handleResend = () => {
    handleClickResend(formik.values);
  };

  useEffect(() => {
    handleChangeCountdownToken(config.features.sendSMSInterval);
  }, [isSendCodeSuccess]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdownToken > 0) {
        handleChangeCountdownToken(countdownToken - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownToken]);

  return (
    <PhoneContainer>
      <GrayInputWrapper key={name} style={{ flex: 1 }}>
        <TextField
          type={"text"}
          placeholder={label}
          variant={"outlined"}
          fullWidth
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={showErrorOn === "input" && formik.touched[name] && formik.errors[name]}
          error={showErrorOn === "input" && !!formik.touched[name] && !!formik.errors[name]}
          inputProps={{
            autoComplete: "off",
          }}
        />
      </GrayInputWrapper>
      {isSendCodeSuccess ? (
        <SendButton disabled={countdownToken > 0} onClick={handleResend}>
          <span>{i18n.t("common.btnTokenResendLabel")}</span>
          {countdownToken > 0 && <Text>{`(${countdownToken}s)`}</Text>}
        </SendButton>
      ) : (
        <SendButton onClick={handleSendCode}>{i18n.t("common.msgSendToken")}</SendButton>
      )}
    </PhoneContainer>
  );
};

export default FormVerifyCodeWithNewRegisterFlow;
