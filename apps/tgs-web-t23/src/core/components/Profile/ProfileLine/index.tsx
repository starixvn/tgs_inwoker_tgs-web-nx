import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import Line from "@/core/components/Profile/PrevComponents/Line";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileLinePage = (props: Props) => {
  useUpdatePageName(i18n.t("common.line"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Line alert={alert} appHistory={history} />;
};

export default ProfileLinePage;
