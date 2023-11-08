import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import Phone from "@/core/components/Profile/PrevComponents/Phone";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfilePhonePage = (props: Props) => {
  useUpdatePageName(i18n.t("common.phoneNumber"));

  return <Phone />;
};

export default ProfilePhonePage;
