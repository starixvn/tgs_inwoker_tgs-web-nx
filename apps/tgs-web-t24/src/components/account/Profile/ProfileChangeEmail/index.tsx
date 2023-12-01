import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import ChangeEmail from "@/components/account/Profile/PrevComponents/ChangeEmail";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileChangeEmail = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.email.editEmail"));
  const { enqueueSnackbar } = useSnackbar();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <ChangeEmail
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileChangeEmail;
