import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import Telegram from "@/components/account/Profile/PrevComponents/Telegram";

const ProfileTelegramPage = () => {
  useUpdatePageName(i18n.t("common.telegram"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Telegram alert={alert} appHistory={history} />;
};

export default ProfileTelegramPage;
