import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import WeChat from "@/components/account/Profile/PrevComponents/WeChat";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileWeChatPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.wechatNumber"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //@ts-ignore
  return (
    <WeChat
      alert={alert}
      appHistory={history}
      handleCloseDialog={handleCloseDialog}
      enqueueSnackbar={enqueueSnackbar}
    />
  );
};

export default ProfileWeChatPage;
