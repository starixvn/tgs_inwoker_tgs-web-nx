import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import ResetWithdrawalPassword from "@/core/components/Profile/PrevComponents/ResetWithdrawalPassword";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileResetWithdrawalPasswordPage = () => {
  useUpdatePageName(i18n.t("profile.resetResetWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ResetWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileResetWithdrawalPasswordPage;
