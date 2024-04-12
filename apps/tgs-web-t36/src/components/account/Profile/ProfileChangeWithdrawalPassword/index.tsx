import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import ChangeWithdrawalPassword from "@/components/account/Profile/PrevComponents/ChangeWithdrawalPassword";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileChangeWithdrawalPasswordPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.changeWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <ChangeWithdrawalPassword
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileChangeWithdrawalPasswordPage;
