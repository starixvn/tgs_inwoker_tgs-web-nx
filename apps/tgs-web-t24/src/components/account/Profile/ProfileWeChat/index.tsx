import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import WeChat from "@/components/account/Profile/PrevComponents/WeChat";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileWeChatPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.wechatNumber"));
  const { enqueueSnackbar } = useSnackbar();

  return <WeChat handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default ProfileWeChatPage;
