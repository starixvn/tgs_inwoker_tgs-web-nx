import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import FacebookMessenger from "@/components/account/Profile/PrevComponents/FacebookMessenger";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileFacebookMessengerPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.fb"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <FacebookMessenger
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileFacebookMessengerPage;
