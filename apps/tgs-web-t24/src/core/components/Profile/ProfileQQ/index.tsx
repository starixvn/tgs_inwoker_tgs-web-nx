import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import QQ from "@/core/components/Profile/PrevComponents/QQ";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileQQPage = (props: Props) => {
  useUpdatePageName(i18n.t("common.qqNumber"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return <QQ alert={alert} appHistory={history} />;
};

export default ProfileQQPage;
