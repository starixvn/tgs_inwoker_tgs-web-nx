import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import Email from "@/components/account/Profile/PrevComponents/Email";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileEmailPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.emailAddress"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Email
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileEmailPage;
