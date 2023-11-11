import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ChangePhone from "@/core/components/Profile/PrevComponents/ChangePhone";

const ProfileChangePhonePage = () => {
  useUpdatePageName(i18n.t("profile.changePhone.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePhone alert={alert} appHistory={history} />;
};

export default ProfileChangePhonePage;
