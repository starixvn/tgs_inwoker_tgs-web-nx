import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import ChangeWithdrawalPassword from "@/core/components/Profile/PrevComponents/ChangeWithdrawalPassword";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileChangeWithdrawalPasswordPage = (props: Props) => {
  useUpdatePageName(i18n.t("profile.changeWithdrawalPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <ChangeWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileChangeWithdrawalPasswordPage;
