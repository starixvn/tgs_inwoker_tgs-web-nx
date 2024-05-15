import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import {
  FormikFormInput,
  useAuthDialog,
  useNewPasswordStage,
  useNewPasswordStageV2,
  useNotifications,
} from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { AccountService } from "@tgs-web-nx/core";
import { TextField } from "@/components/UI/TextField";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";
import { SubmitButton as SendButton } from "@/components/styled-component/ProfileForms";
import Loading from "@/components/UI/Loading";

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
  const { label, name, type } = formInput;
  const { phone, areaCode } = formik.values;
  const { alert } = useNotifications();
  const { handleSetLoading, isLoading } = useNewPasswordStageV2();
  const [countdownToken, setCountdownToken] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdownToken > 0) {
        setCountdownToken((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownToken]);

  const checkPhoneNumber = () => {
    let res = true;
    if (
      (brandConfig[mapBrandName(config.brand)].isFixedPhoneLength &&
        phone.length !== config.features.MAX_PHONE_LENGTH) ||
      (phone.length === config.features.MAX_PHONE_LENGTH && phone[0] !== "0")
    ) {
      alert(
        "",
        i18n
          .t("common.noReachLength")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      );
      res = false;
      return;
    }

    if (
      (!brandConfig[mapBrandName(config.brand)].isFixedPhoneLength && phone.length < 8) ||
      phone.length > (config.features.MAX_PHONE_LENGTH || 10)
    ) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      );
      res = false;
    }
    return res;
  };

  const handleSendCode = async () => {
    if (checkPhoneNumber()) {
      handleSetLoading(true);
      try {
        const verifyForgotPasswordResDto = await AccountService.VerifyForgotPassword(
          "",
          areaCode,
          brandConfig[mapBrandName(config.brand)].isFixedPhoneLength ? phone.slice(1) : phone,
        );

        if (verifyForgotPasswordResDto.IsSuccess) {
          formik.setFieldValue("securityKey", verifyForgotPasswordResDto.data);
          setCountdownToken(config.features.sendSMSInterval);
          alert("", i18n.t("common.msgTokenSent"));
        } else {
          let errorCode = verifyForgotPasswordResDto.info || "";
          if (errorCode === "Player is not found in the system.") {
            errorCode = "error.ERR201";
          }
          alert("", i18n.t(errorCode));
        }
      } catch (error: any) {
        alert("", error.message);
      } finally {
        handleSetLoading(false);
      }
    }
  };

  return (
    <PhoneContainer>
      <Loading show={isLoading} />
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
      <SendButton disabled={countdownToken > 0} onClick={handleSendCode}>
        {`${i18n.t("common.msgSendToken")} ${countdownToken > 0 ? `(${countdownToken})` : ""}`}
      </SendButton>
    </PhoneContainer>
  );
};

export default FormVerifyCode;
