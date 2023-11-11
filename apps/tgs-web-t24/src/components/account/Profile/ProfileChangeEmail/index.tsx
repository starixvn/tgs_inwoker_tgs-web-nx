import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ChangeEmail from "@/components/account/Profile/PrevComponents/ChangeEmail";

const ProfileChangeEmail = () => {
  useUpdatePageName(i18n.t("profile.email.editEmail"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeEmail alert={alert} appHistory={history} />;
};

export default ProfileChangeEmail;
