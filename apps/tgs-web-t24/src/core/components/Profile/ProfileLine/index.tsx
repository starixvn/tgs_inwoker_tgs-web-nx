import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/core/utils/i18n";
import Line from "@/core/components/Profile/PrevComponents/Line";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileLinePage = () => {
  useUpdatePageName(i18n.t("common.line"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Line alert={alert} appHistory={history} />;
};

export default ProfileLinePage;
