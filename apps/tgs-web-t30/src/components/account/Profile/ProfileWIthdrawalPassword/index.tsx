import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import WithdrawalPassword from "@/components/account/Profile/PrevComponents/WithdrawalPassword";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileWithdrawalPasswordPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.withdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <WithdrawalPassword
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileWithdrawalPasswordPage;
