import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import QQ from "@/components/account/Profile/PrevComponents/QQ";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileQQPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.qqNumber"));
  const { enqueueSnackbar } = useSnackbar();

  return <QQ handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default ProfileQQPage;
