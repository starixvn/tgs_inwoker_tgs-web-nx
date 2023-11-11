import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import WeChat from "@/core/components/Profile/PrevComponents/WeChat";

const ProfileWeChatPage = () => {
  useUpdatePageName(i18n.t("common.wechatNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <WeChat alert={alert} appHistory={history} />;
};

export default ProfileWeChatPage;
