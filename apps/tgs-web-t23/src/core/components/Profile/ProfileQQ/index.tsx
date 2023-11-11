import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import QQ from "@/core/components/Profile/PrevComponents/QQ";

const ProfileQQPage = () => {
  useUpdatePageName(i18n.t("common.qqNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <QQ alert={alert} appHistory={history} />;
};

export default ProfileQQPage;
