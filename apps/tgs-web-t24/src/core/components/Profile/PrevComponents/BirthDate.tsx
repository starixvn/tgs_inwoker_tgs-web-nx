import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import BottomNote from "@/components/UI/BottomNote";
import Loading from "@/components/UI/Loading";
import { useNotifications } from "@/core/feature/useNotifications";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { AccountService } from "@/core/services/AccountService";
import {
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import { DatePickerForBirthDate } from "@/components/UI/DatePicker";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Birthdate = () => {
  const { alert } = useNotifications();
  const { account, getAccountProfile } = useAccountStore();

  const [birthdate, setBirthdate] = useState<string>(
    moment(account.info.member_birthdate ? account.info.member_birthdate : new Date()).format(
      "YYYY/MM/DD",
    ),
  );

  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const isConfigured = !!account.info.member_birthdate;

    setIsConfigured(isConfigured);
    setBirthdate(account.info.member_birthdate || "");
  }, [account]);

  const handleChangeNumber = async (e: Date | null) => {
    if (moment(e).isAfter(new Date())) {
      setBirthdate(moment(new Date()).format("YYYY/MM/DD"));
    } else {
      setBirthdate(moment(e!).format("YYYY/MM/DD"));
    }
    onTextChanged();
  };

  const isDisableButton = () => {
    return !birthdate;
  };

  const handleSubmitClicked = async () => {
    showLoading(true);

    // API call
    try {
      const response = await AccountService.SetBirthDate(birthdate);
      if (response.IsSuccess) {
        const responseUpdate = await getAccountProfile(true);
        if (responseUpdate?.IsSuccess) {
          setIsConfigured(true);
        }

        alert("", i18n.t("common.msgSuccessUpdateProfile"));
        showLoading(false);
      } else {
        //@ts-ignore
        alert("", response.msg);
        showLoading(false);
      }
    } catch (err: any) {
      //@ts-ignore
      alert("", err.message);
      showLoading(false);
    }
  };

  const onTextChanged = () => {
    setMessage("");
  };

  const showLoading = (loading: boolean) => {
    setIsLoading(loading);
  };
  return (
    <Container>
      <ItemContainer>
        <LabelContainer>{i18n.t("profile.birthdate.title")}</LabelContainer>
        <DatePickerForBirthDate
          disabled={isConfigured && config.features.Profile_SetUpBirthdateOnce}
          format="yyyy/MM/dd"
          value={new Date(birthdate)}
          onChange={(e) => handleChangeNumber(e)}
        />
      </ItemContainer>

      <ItemContainer>
        {isConfigured && config.features.Profile_SetUpBirthdateOnce ? (
          <BottomNote
            text1={i18n.t("profile.birthdate.toEdit")}
            link={"../chat"}
            text2={i18n.t(
              config.features.Profile_SetUpBirthdateOnce
                ? "common.customerService"
                : "profile.birthdate.here",
            )}
          />
        ) : (
          birthdate !== account.info.member_birthdate && (
            <BottomNote text1={i18n.t("common.complete")} />
          )
        )}
        {message}
      </ItemContainer>

      <SubmitButton
        fullWidth
        disabled={isDisableButton() || isLoading}
        onClick={handleSubmitClicked}
      >
        <>{i18n.t("common.submit")}</>
      </SubmitButton>

      <Loading show={isLoading} />
    </Container>
  );
};

export default Birthdate;
