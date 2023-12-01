import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import Telegram from "@/components/account/Profile/PrevComponents/Telegram";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileTelegramPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.telegram"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Telegram
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileTelegramPage;
