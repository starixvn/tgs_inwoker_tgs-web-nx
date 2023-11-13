import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ChangeWithdrawalPassword from "@/components/account/Profile/PrevComponents/ChangeWithdrawalPassword";

const ProfileChangeWithdrawalPasswordPage = () => {
  useUpdatePageName(i18n.t("profile.changeWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileChangeWithdrawalPasswordPage;
