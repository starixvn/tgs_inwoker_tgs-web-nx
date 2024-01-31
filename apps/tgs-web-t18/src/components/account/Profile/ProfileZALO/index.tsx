import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import ZALO from "@/components/account/Profile/PrevComponents/ZALO";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileZALOPage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName("ZALO");
  const { enqueueSnackbar } = useSnackbar();

  return <ZALO handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default ProfileZALOPage;
