import React from "react";
import i18n from "@/utils/i18n";
import Phone from "@/core/components/Profile/PrevComponents/Phone";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ProfilePhonePage = () => {
  useUpdatePageName(i18n.t("common.phoneNumber"));

  return <Phone />;
};

export default ProfilePhonePage;
