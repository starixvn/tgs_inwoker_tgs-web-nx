import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import Email from "@/components/account/Profile/PrevComponents/Email";

const ProfileEmailPage = () => {
  useUpdatePageName(i18n.t("common.emailAddress"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Email alert={alert} appHistory={history} />;
};

export default ProfileEmailPage;
