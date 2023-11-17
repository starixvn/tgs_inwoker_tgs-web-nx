import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Birthdate from "@/components/account/Profile/PrevComponents/BirthDate";

const ProfileBirthDatePage = () => {
  useUpdatePageName(i18n.t("profile.birthdate.title"));

  return <Birthdate />;
};

export default ProfileBirthDatePage;
