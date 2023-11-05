import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import Email from "@/core/components/Profile/PrevComponents/Email";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileEmailPage = (props: Props) => {
  useUpdatePageName(i18n.t("common.emailAddress"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Email alert={alert} appHistory={history} />;
};

export default ProfileEmailPage;
