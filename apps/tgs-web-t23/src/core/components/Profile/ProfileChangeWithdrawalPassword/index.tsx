import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/core/utils/i18n";
import ChangeWithdrawalPassword from "@/core/components/Profile/PrevComponents/ChangeWithdrawalPassword";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileChangeWithdrawalPasswordPage = () => {
  useUpdatePageName(i18n.t("profile.changeWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileChangeWithdrawalPasswordPage;
