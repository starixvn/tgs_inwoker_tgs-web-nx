import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import Viber from "@/core/components/Profile/PrevComponents/Viber";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileViberPage = () => {
  useUpdatePageName(i18n.t("common.viber"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Viber alert={alert} appHistory={history} />;
};

export default ProfileViberPage;
