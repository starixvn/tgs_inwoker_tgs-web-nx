import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import Phone from "@/core/components/Profile/PrevComponents/Phone";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfilePhonePage = () => {
  useUpdatePageName(i18n.t("common.phoneNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <Phone alert={alert} appHistory={history} />;
};

export default ProfilePhonePage;
