import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import Viber from "@/components/account/Profile/PrevComponents/Viber";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileViberPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.viber"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Viber
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileViberPage;
