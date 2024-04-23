import React, { useState } from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import config from "@tgs-web-nx/config";
import { FormikFormInput, useCreatePlayerStageWithSMSVerify } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { TextField } from "@/components/UI/TextField";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { SubmitButton as SendButton } from "@/components/styled-component/ProfileForms";

const PhoneContainer = styled.div`
  display: flex;
  overflow: visible;
  gap: 14px;
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormVerifyCode = ({ formInput, formik, showErrorOn }: Props) => {
  const { handleClickSend, handleClickResend } = useCreatePlayerStageWithSMSVerify();

  const { label, name, type } = formInput;
  const [isSent, setIssent] = useState(false);

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
        setIssent(true);
        handleClickSend(formik.values);
      }
    });
  };

  const handleResend = () => {
    handleClickResend(formik.values);
  };

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
      {isSent ? (
        <SendButton onClick={handleResend}>{i18n.t("common.btnTokenResendLabel")}</SendButton>
      ) : (
        <SendButton onClick={handleSendCode}>{i18n.t("common.msgSendToken")}</SendButton>
      )}
    </PhoneContainer>
  );
};

export default FormVerifyCode;
