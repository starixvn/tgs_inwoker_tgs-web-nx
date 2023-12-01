import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ChangePassword from "@/components/account/Profile/PrevComponents/ChangePassword";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileChangePasswordPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.changePassword.editPassword"));

  const { alert } = useNotifications();
  const history = useHistory();

  //@ts-ignore
  return (
    <ChangePassword alert={alert} appHistory={history} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileChangePasswordPage;
