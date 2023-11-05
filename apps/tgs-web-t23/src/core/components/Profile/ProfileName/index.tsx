import React from "react";
import { useHistory } from "react-router";
import i18n from "@/utils/i18n";
import NameVerify from "@/core/components/Profile/PrevComponents/NameVerify";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileNamePage = (props: Props) => {
  useUpdatePageName(i18n.t("profile.nameVerify.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <NameVerify alert={alert} appHistory={history} />;
};

export default ProfileNamePage;
