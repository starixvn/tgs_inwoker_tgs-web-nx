import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import Phone from "@/components/account/Profile/PrevComponents/Phone";

type Props = {
  handleCloseDialog: () => void;
};

const ProfilePhonePage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("common.phoneNumber"));
  const { enqueueSnackbar } = useSnackbar();

  return <Phone handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default ProfilePhonePage;
