import React from "react";
import Birthdate from "@/core/components/Profile/PrevComponents/BirthDate";
import i18n from "@/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfileBirthDatePage = () => {
  useUpdatePageName(i18n.t("profile.birthdate.title"));

  return <Birthdate />;
};

export default ProfileBirthDatePage;
