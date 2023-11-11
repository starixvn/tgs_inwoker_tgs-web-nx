import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@/core/feature/useNotifications";
import Whatsapp from "@/core/components/Profile/PrevComponents/Whatsapp";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileWhatsappPage = () => {
  useUpdatePageName(i18n.t("common.whatsapp"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Whatsapp alert={alert} appHistory={history} />;
};

export default ProfileWhatsappPage;
