import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import ChangePhone from "@/core/components/Profile/PrevComponents/ChangePhone";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileChangePhonePage = (props: Props) => {
  useUpdatePageName(i18n.t("profile.changePhone.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePhone alert={alert} appHistory={history} />;
};

export default ProfileChangePhonePage;
