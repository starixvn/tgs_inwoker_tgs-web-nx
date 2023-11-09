import React from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "@/core/components/Profile/PrevComponents/ChangePassword";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileChangePasswordPage = () => {
  useUpdatePageName(i18n.t("profile.changePassword.editPassword"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <ChangePassword alert={alert} appHistory={history} />;
};

export default ProfileChangePasswordPage;
