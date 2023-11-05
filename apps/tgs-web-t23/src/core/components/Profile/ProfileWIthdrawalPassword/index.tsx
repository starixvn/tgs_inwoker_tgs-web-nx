import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import WithdrawalPassword from "@/core/components/Profile/PrevComponents/WithdrawalPassword";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileWithdrawalPasswordPage = (props: Props) => {
  useUpdatePageName(i18n.t("profile.withdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <WithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileWithdrawalPasswordPage;
