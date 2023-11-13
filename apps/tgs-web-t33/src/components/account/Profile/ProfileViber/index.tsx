import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import Viber from "@/components/account/Profile/PrevComponents/Viber";

const ProfileViberPage = () => {
  useUpdatePageName(i18n.t("common.viber"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Viber alert={alert} appHistory={history} />;
};

export default ProfileViberPage;
