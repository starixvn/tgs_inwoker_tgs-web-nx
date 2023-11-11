import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import WithdrawalPassword from "@/core/components/Profile/PrevComponents/WithdrawalPassword";

const ProfileWithdrawalPasswordPage = () => {
  useUpdatePageName(i18n.t("profile.withdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <WithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileWithdrawalPasswordPage;
