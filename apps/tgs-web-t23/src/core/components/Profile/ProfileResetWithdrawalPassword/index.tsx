import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ResetWithdrawalPassword from "@/core/components/Profile/PrevComponents/ResetWithdrawalPassword";

const ProfileResetWithdrawalPasswordPage = () => {
  useUpdatePageName(i18n.t("profile.resetResetWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ResetWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileResetWithdrawalPasswordPage;
