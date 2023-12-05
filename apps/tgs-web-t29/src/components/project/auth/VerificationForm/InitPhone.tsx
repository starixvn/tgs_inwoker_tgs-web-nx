import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { EnqueueSnackbar } from "notistack";
import { UpdatePhoneResDto } from "@tgs-web-nx/types";
import BottomNote from "@/components/UI/BottomNote";
import Loading from "@/components/UI/Loading";
import TextFieldWithButton from "@/components/UI/TextFieldWithButton";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import { Select } from "@/components/UI/Select";

const PhoneContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const AREA_CODE = config.features.PhonePrefix;

type Props = {
  handleCloseDialog: () => void;
  enqueueSnackbar: EnqueueSnackbar;
  isProceedForgotPasswordV2?: boolean;
};

function InitPhone({ enqueueSnackbar, handleCloseDialog, isProceedForgotPasswordV2 }: Props) {
  const { account, newRegister, getRegisterStatus, getAccountInfo } = useAccountStore();
  const history = useHistory();
  const { alert } = useNotifications();

  const [countdownToken, setCountdownToken] = useState(0);
  const [areacode, setAreacode] = useState(AREA_CODE);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [securityKey, setSecurityKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isConfigured = !!(account.info.check_pass_phone && account.info.member_phone);

    if (account.info.check_pass_phone && account.info.member_phone) {
      setPhone(isConfigured ? account.info.member_phone : "");
    }
    setCode("");
    setIsNew(!account.info.check_pass_phone);
    setIsConfigured(isConfigured);
  }, [account.info]);

  const handleChangePhone = (e: ChangeEvent<any>) => {
    setPhone(e.target.value);
    if (
      (config.features.Register_CustomFlow_IDR && !account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    ) {
      onTextChanged();
    }
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
      const response = await newRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areacode,
          phone: phone,
        },
      });

      //@ts-ignore
      if (response.IsSuccess) {
        setCountdownToken(60);
        //@ts-ignore
        setSecurityKey(response.data.stepResponse);
        showInfoMessage(i18n.t("common.msgTokenSent"));
      } else {
        //@ts-ignore
        showErrorMessage(response.info);
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

  const handleSubmitSucceed = () => {
    enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
      variant: "success",
    });
    handleCloseDialog();
  };

  const handleSubmitClicked = async () => {
    setIsLoading(true);

    try {
      if (shouldHandlePhoneSubmission()) {
        const getRegisterStatusResDto = await getRegisterStatus();

        if (getRegisterStatusResDto?.IsSuccess) {
          const currentStepKey = getRegisterStatusResDto.data;
          if (currentStepKey === "SetPhoneDontCareDuplicate") {
            await handleSetPhoneDontCareDuplicate();
          }
        } else {
          await handleInitPhoneSubmission();
        }
      } else {
        await handleUpdatePhone(securityKey, code);
      }
    } catch (error: any) {
      showErrorMessage(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const shouldHandlePhoneSubmission = () => {
    return (
      (config.features.Register_CustomFlow_IDR && !account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    );
  };

  const handleSetPhoneDontCareDuplicate = async () => {
    const responseSetPhone = await newRegister("SetPhoneDontCareDuplicate", {
      areacode: areacode,
      phone: phone,
    });

    if (responseSetPhone?.IsSuccess) {
      await handleGetAccountInfo();
      handleSubmitSucceed();
    } else {
      showErrorMessage(responseSetPhone?.info || "");
    }
  };

  const handleInitPhoneSubmission = async () => {
    const responseInitPhone = await newRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: areacode,
        phone: phone,
      },
    });

    if (responseInitPhone?.IsSuccess) {
      const responseValid = await newRegister("InitPhone", {
        input: "Valid",
        data: {
          securitykey: responseInitPhone.data.stepResponse,
          validatecode: "123456", // You might need to replace this
        },
      });

      if (responseValid?.IsSuccess) {
        await handleGetAccountInfo();
        handleSubmitSucceed();
      } else {
        showErrorMessage(responseValid?.info);
      }
    } else {
      showErrorMessage(responseInitPhone?.info);
    }
  };

  const handleUpdatePhone = async (securityKey: string, code: string) => {
    const response = await AccountService.UpdatePhoneV2(securityKey, code);

    if (response?.IsSuccess) {
      await handleGetAccountInfo();
      handleSubmitSucceed();
    } else {
      showErrorMessage(response?.info);
    }
  };

  const handleGetAccountInfo = async () => {
    const responseUpdate = await getAccountInfo();

    if (responseUpdate?.IsSuccess) {
      if (responseUpdate.data.email === null && !responseUpdate.data.registercompleted) {
        // history.push({
        //   pathname: "/profile/email",
        //   state: { forced: true },
        // });
      } else {
        setCode("");
        setSecurityKey("");
        setCountdownToken(0);
        setIsNew(false);
        setIsConfigured(true);
      }
    }
  };

  return (
    <>
      <ItemContainer>
        <PhoneContainer>
          <FormControl variant="outlined" style={{ width: "40%" }}>
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
          </FormControl>

          <FormControl variant="outlined">
            <TextField
              type={"text"}
              value={phone}
              placeholder={i18n.t("common.msgEnterPhone")}
              disabled={
                (isConfigured ? isConfigured : false) || config.features.Profile_DisableVerifyPhone
              }
              onChange={handleChangePhone}
            />
          </FormControl>
        </PhoneContainer>
      </ItemContainer>

      {(() => {
        if (
          !(config.features.Register_CustomFlow_IDR && !account.registercompleted) &&
          !isConfigured
        ) {
          return (
            !config.features.Profile_DisableVerifyPhone &&
            !config.features.InitPhone_WithoutVerify && (
              <ItemContainer>
                <FormControl variant="outlined">
                  <TextFieldWithButton
                    buttonLabel={
                      countdownToken <= 0
                        ? i18n.t("common.msgSendToken")
                        : `${i18n.t("common.btnTokenResendLabel")}(${countdownToken}s)`
                    }
                    value={code}
                    onChange={handleChangeCode}
                    placeholder={i18n.t("common.msgEnterPhoneCode")}
                    onClick={handleGetCodeClick}
                    buttonDisabled={countdownToken > 0}
                  />
                </FormControl>
              </ItemContainer>
            )
          );
        }
      })()}

      <SubmitButton
        fullWidth
        disabled={isDisableButton}
        onClick={handleSubmitClicked}
        style={{ marginBottom: "20px" }}
      >
        {i18n.t("common.submit")}
      </SubmitButton>

      {isConfigured || config.features.InitPhone_WithoutVerify ? (
        config.features.Profile_DisableEditPhone ? (
          <BottomNote
            text1={i18n.t("profile.phone.toEdit")}
            link={"../chat"}
            text2={i18n.t("common.customerService")}
          />
        ) : (
          <BottomNote
            text1={i18n.t("profile.phone.toEdit")}
            link={
              config.features.ChangesNotAllowed || config.features.Profile_ExistingDetails_ViewOnly
                ? "../chat"
                : "./changephone"
            }
            text2={i18n.t(
              config.features.ChangesNotAllowed || config.features.Profile_ExistingDetails_ViewOnly
                ? "common.customerService"
                : "profile.phone.here",
            )}
          />
        )
      ) : null}

      <Loading show={isLoading} />
    </>
  );
}

export default InitPhone;
