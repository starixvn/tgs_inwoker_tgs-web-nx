import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { EnqueueSnackbar } from "notistack";
import { ForgotPasswordStageEnum, ValueOf } from "@tgs-web-nx/types";
import Loading from "@/components/UI/Loading";
import TextFieldWithButton from "@/components/UI/TextFieldWithButton";
import { ItemContainer, VerifySubmitButton } from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import { Select } from "@/components/UI/Select";
import { GrayInputWrapper } from "@/components/styled-component/auth/GrayInputWrapper";

const PhoneContainer = styled.div`
  display: flex;
  gap: 8px;
`;

type Props = {
  handleCloseDialog: () => void;
  enqueueSnackbar: EnqueueSnackbar;
  handleUpdateStage: (nextStage: ValueOf<typeof ForgotPasswordStageEnum>, payload: any) => void;
};

function VerifyPhone({ handleUpdateStage }: Props) {
  const { account } = useAccountStore();
  const { alert } = useNotifications();

  const [countdownToken, setCountdownToken] = useState(0);
  const AREA_CODE = config.features.PhonePrefix;
  const [areacode, setAreacode] = useState(AREA_CODE);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [securityKey, setSecurityKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePhone = (e: ChangeEvent<any>) => {
    setPhone(e.target.value);
    onTextChanged();
  };

  const handleChangeCode = (e: ChangeEvent<any>) => {
    setCode(e.target.value);
    onTextChanged();
  };

  const handleGetCodeClick = async () => {
    if (countdownToken > 0) return;

    if (!phone) return showErrorMessage(i18n.t("common.msgEnterPhone"));
    if (phone.length < 8 || phone.length > (config.features.MAX_PHONE_LENGTH || 10)) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      );
      return;
    }

    setIsLoading(true);
    try {
      const verifyForgotPasswordResDto = await AccountService.VerifyForgotPassword(
        "",
        areacode,
        phone,
      );

      if (verifyForgotPasswordResDto.IsSuccess) {
        setCountdownToken(60);
        setSecurityKey(verifyForgotPasswordResDto.data);
        showInfoMessage(i18n.t("common.msgTokenSent"));
      } else {
        let errorCode = verifyForgotPasswordResDto.info || "";
        if (errorCode === "Player is not found in the system.") {
          errorCode = "error.ERR201";
        }
        showErrorMessage(i18n.t(errorCode));
      }
    } catch (error: any) {
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdownToken > 0) {
        setCountdownToken((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownToken]);

  const onTextChanged = () => {
    if (message != null && message.length > 0) {
      setMessage(""); // clear
    }
  };

  const showErrorMessage = (msg?: string | null | undefined) => {
    alert("", msg || "");
  };

  const showInfoMessage = (msg?: string | null | undefined) => {
    alert("", msg || "");
  };

  const isDisableButton =
    (config.features.Register_CustomFlow_IDR && !account.registercompleted && !phone) ||
    !(code && phone);

  const handleSubmitClicked = async () => {
    setIsLoading(true);

    try {
      await handleNextStep(securityKey, code);
    } catch (error: any) {
      showErrorMessage(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async (securityKey: string, code: string) => {
    handleUpdateStage(ForgotPasswordStageEnum.NewPassword, {
      securityKey,
      code,
    });
  };

  return (
    <>
      <ItemContainer>
        <PhoneContainer>
          <GrayInputWrapper style={{ width: "40%" }}>
            <Select
              native
              value={areacode}
              onChange={(e) => {
                setAreacode(`${e.target.value}`);
              }}
              disabled={
                (isConfigured ? isConfigured : false) ||
                (config.features.Profile_DisableVerifyPhone &&
                  !config.features.InitPhone_WithoutVerify)
              }
            >
              <option value={AREA_CODE}>{AREA_CODE}</option>
            </Select>
          </GrayInputWrapper>

          <GrayInputWrapper>
            <TextField
              type={"text"}
              value={phone}
              placeholder={i18n.t("common.msgEnterPhone")}
              disabled={
                (isConfigured ? isConfigured : false) || config.features.Profile_DisableVerifyPhone
              }
              onChange={handleChangePhone}
            />
          </GrayInputWrapper>
        </PhoneContainer>
      </ItemContainer>

      <ItemContainer>
        <GrayInputWrapper>
          <TextFieldWithButton
            buttonLabel={
              countdownToken <= 0
                ? i18n.t("common.msgSendToken")
                : `${i18n.t("common.btnTokenResendLabel")}(${countdownToken}s)`
            }
            value={code}
            onChange={handleChangeCode}
            placeholder={i18n.t("common.msgEnterPhoneCode")}
            type={"number"}
            onClick={handleGetCodeClick}
            buttonDisabled={countdownToken > 0}
          />
        </GrayInputWrapper>
      </ItemContainer>

      <VerifySubmitButton fullWidth disabled={isDisableButton} onClick={handleSubmitClicked}>
        {i18n.t("common.submit")}
      </VerifySubmitButton>

      <Loading show={isLoading} />
    </>
  );
}

export default VerifyPhone;
