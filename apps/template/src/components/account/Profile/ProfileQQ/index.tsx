import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import QQ from "@/components/account/Profile/PrevComponents/QQ";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileQQPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.qqNumber"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //@ts-ignore
  return (
    <QQ
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileQQPage;
