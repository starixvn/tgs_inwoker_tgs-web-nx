import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import Email from "@/core/components/Profile/PrevComponents/Email";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileEmailPage = () => {
  useUpdatePageName(i18n.t("common.emailAddress"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Email alert={alert} appHistory={history} />;
};

export default ProfileEmailPage;
