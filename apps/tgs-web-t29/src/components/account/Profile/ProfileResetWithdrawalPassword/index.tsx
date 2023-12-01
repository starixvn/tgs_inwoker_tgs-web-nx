import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ResetWithdrawalPassword from "@/components/account/Profile/PrevComponents/ResetWithdrawalPassword";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileResetWithdrawalPasswordPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.resetResetWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <ResetWithdrawalPassword
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileResetWithdrawalPasswordPage;
