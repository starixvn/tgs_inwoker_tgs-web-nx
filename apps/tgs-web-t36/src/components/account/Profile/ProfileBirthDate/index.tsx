import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useSnackbar } from "notistack";
import Birthdate from "@/components/account/Profile/PrevComponents/BirthDate";

type Props = {
  handleCloseDialog: () => void;
};

const ProfileBirthDatePage = ({ handleCloseDialog }: Props) => {
  useUpdatePageName(i18n.t("profile.birthdate.title"));
  const { enqueueSnackbar } = useSnackbar();

  //@ts-ignore
  return <Birthdate handleCloseDialog={handleCloseDialog} enqueueSnackbar={enqueueSnackbar} />;
};

export default ProfileBirthDatePage;
