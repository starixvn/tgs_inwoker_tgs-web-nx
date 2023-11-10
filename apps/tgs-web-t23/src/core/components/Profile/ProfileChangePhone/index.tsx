import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import ChangePhone from "@/core/components/Profile/PrevComponents/ChangePhone";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileChangePhonePage = () => {
  useUpdatePageName(i18n.t("profile.changePhone.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePhone alert={alert} appHistory={history} />;
};

export default ProfileChangePhonePage;
