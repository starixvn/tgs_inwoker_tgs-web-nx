import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { AccountService, useAccountStore } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { EnqueueSnackbar } from "notistack";
import Loading from "@/components/UI/Loading";
import BottomNote from "@/components/UI/BottomNote";
import { TextField } from "@/components/UI/TextField";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";

type Props = {
  handleCloseDialog: () => void;
  enqueueSnackbar: EnqueueSnackbar;
};

const ZALO = (props: Props) => {
  const { account, getAccountProfile } = useAccountStore();
  const { alert } = useNotifications();

  // const [wechat, setWechat] = useState("");
  const [zalo, setZalo] = useState("");

  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const isConfigured = !!account?.info.member_zalo;

    setZalo(account.info.member_zalo || "");
    setIsConfigured(isConfigured);
  }, [account.info]);

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZalo(e.target.value);
    onTextChanged();
  };

  const isDisableButton = () => {
    return !zalo;
  };

  const handleSubmitClicked = async () => {
    const zaloValue = zalo;
    // Validate ZALO here
    // const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    // if (!zaloValue.match(re)) {
    //   alert("", "Invalid ZALO account");
    //   return;
    // }

    showLoading(true);

    try {
      // API call to update WeChat
      const response = await AccountService.UpdateIM(zaloValue, "zalo", "zalo");

      //@ts-ignore
      if (response?.IsSuccess) {
        const responseUpdate = await getAccountProfile(true);
        if (responseUpdate?.IsSuccess) {
          setZalo(zaloValue);
          setIsConfigured(true);
        }
        alert("", i18n.t("common.msgSuccessUpdateProfile"));
        showLoading(false);
      } else {
        //@ts-ignore
        alert("", response?.msg);
        showLoading(false);
      }
    } catch (error: any) {
      alert("", error.message);
      showLoading(false);
    }
  };

  const showLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const onTextChanged = () => {
    // Handle text changes here
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div>
      <ItemContainer>
        <LabelContainer>ZALO Account</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            value={zalo}
            onChange={handleChangeNumber}
            placeholder={"Please enter ZALO account"}
            disabled={
              isConfigured &&
              (config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly)
            }
          />
        </FormControl>
      </ItemContainer>

      {isConfigured && config.features.ChangesNotAllowed ? (
        <div>
          <BottomNote
            text1={"If Required to Edit ZALO, Please Click"}
            link={"../chat"}
            text2={i18n.t("common.customerService")}
          />
        </div>
      ) : (
        <div>
          <SubmitButton
            fullWidth
            disabled={isDisableButton() || isLoading}
            onClick={handleSubmitClicked}
            style={{ marginBottom: "20px" }}
          >
            {i18n.t("common.submit")}
          </SubmitButton>

          {/* <BottomNote
            text1={i18n.t("profile.wechat.toEdit")}
            link={
              config.features.ChangesNotAllowed || config.features.Profile_ExistingDetails_ViewOnly
                ? "../chat"
                : "profile.wechat.here"
            }
          /> */}
        </div>
      )}

      <Loading show={isLoading} />
    </div>
  );
};

export default ZALO;
