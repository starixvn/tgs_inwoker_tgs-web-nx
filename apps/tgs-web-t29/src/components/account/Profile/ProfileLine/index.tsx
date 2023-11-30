import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import Line from "@/components/account/Profile/PrevComponents/Line";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileLinePage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.line"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <Line alert={alert} appHistory={history} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileLinePage;
