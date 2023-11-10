import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import Birthdate from "@/core/components/Profile/PrevComponents/BirthDate";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileBirthDatePage = () => {
  useUpdatePageName(i18n.t("profile.birthdate.title"));

  return <Birthdate />;
};

export default ProfileBirthDatePage;
