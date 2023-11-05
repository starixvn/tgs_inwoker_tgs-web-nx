import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import WeChat from "@/core/components/Profile/PrevComponents/WeChat";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileWeChatPage = (props: Props) => {
  useUpdatePageName(i18n.t("common.wechatNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <WeChat alert={alert} appHistory={history} />;
};

export default ProfileWeChatPage;
