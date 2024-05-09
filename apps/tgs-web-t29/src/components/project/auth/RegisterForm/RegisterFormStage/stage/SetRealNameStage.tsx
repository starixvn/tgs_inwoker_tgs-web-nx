import { useAuthDialog, useNotifications, useSetRealNameStage } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import { useAccountStore } from "@tgs-web-nx/core";
import { RegisterV2SetRealNameDto } from "@tgs-web-nx/types";
import NameVerify from "@/components/account/Profile/PrevComponents/NameVerify";
import { TextField } from "@/components/UI/TextField";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";

const InitRealNameStage = () => {
  const { handleCloseDialog, enqueueSnackbar } = useSetRealNameStage();
  const { alert } = useNotifications();
  const history = useHistory();
  const { registerV2SetRealName } = useAccountStore();
  const { handleToggleSetRealNameDialog, handleToggleInitPhoneDialog, handleToggleRegisterDialog } =
    useAuthDialog();

  const [name, setName] = useState("");
  const handleVerify = async () => {
    const setRealNameReqDto: RegisterV2SetRealNameDto = {
      realname: name,
    };
    const response = await registerV2SetRealName(setRealNameReqDto);
    if (response?.data.isCompleted) {
      handleToggleRegisterDialog(false);
    } else {
      handleToggleSetRealNameDialog(false);
      handleToggleInitPhoneDialog(true);
    }
  };
  return (
    <>
      {/* <NameVerify
        alert={alert}
        appHistory={history}
        handleCloseDialog={handleCloseDialog}
        enqueueSnackbar={enqueueSnackbar}
      /> */}
      <ItemContainer>
        <LabelContainer>{i18n.t("profile.nameVerify.verifyName")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type={"text"}
            placeholder={i18n.t("piso.profile.enterFullName")}
            disabled={false}
          />
        </FormControl>
      </ItemContainer>
      <SubmitButton onClick={handleVerify} fullWidth={true} type={"submit"} disabled={false}>
        {i18n.t("common.submit")}
      </SubmitButton>
    </>
  );
};

export default InitRealNameStage;
