import React from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import Telegram from "@/core/components/Profile/PrevComponents/Telegram";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileTelegramPage = (props: Props) => {
  useUpdatePageName(i18n.t("common.telegram"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Telegram alert={alert} appHistory={history} />;
};

export default ProfileTelegramPage;
