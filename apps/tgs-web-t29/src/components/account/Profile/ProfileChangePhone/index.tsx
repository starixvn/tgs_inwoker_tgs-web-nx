import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ChangePhone from "@/components/account/Profile/PrevComponents/ChangePhone";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileChangePhonePage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.changePhone.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePhone alert={alert} appHistory={history} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileChangePhonePage;
