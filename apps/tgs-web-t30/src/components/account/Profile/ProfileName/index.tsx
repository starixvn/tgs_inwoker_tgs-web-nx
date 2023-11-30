import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import NameVerify from "@/components/account/Profile/PrevComponents/NameVerify";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileNamePage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.nameVerify.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <NameVerify alert={alert} appHistory={history} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileNamePage;
