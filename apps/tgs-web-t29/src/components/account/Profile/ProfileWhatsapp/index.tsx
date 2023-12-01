import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import Whatsapp from "@/components/account/Profile/PrevComponents/Whatsapp";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileWhatsappPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.whatsapp"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Whatsapp alert={alert} appHistory={history} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileWhatsappPage;
