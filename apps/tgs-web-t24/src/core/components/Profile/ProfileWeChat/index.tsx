import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import WeChat from "@/core/components/Profile/PrevComponents/WeChat";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileWeChatPage = () => {
  useUpdatePageName(i18n.t("common.wechatNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <WeChat alert={alert} appHistory={history} />;
};

export default ProfileWeChatPage;
