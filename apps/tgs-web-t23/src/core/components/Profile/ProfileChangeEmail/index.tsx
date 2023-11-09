import React from "react";
import { useHistory } from "react-router-dom";
import ChangeEmail from "@/core/components/Profile/PrevComponents/ChangeEmail";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileChangeEmail = () => {
  useUpdatePageName(i18n.t("profile.email.editEmail"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeEmail alert={alert} appHistory={history} />;
};

export default ProfileChangeEmail;
