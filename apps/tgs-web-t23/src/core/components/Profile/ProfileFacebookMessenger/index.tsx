import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import FacebookMessenger from "@/core/components/Profile/PrevComponents/FacebookMessenger";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileFacebookMessengerPage = (props: Props) => {
  useUpdatePageName(i18n.t("common.fb"));

  const { alert } = useNotifications();
  const history = useHistory();

  return <FacebookMessenger alert={alert} appHistory={history} />;
};

export default ProfileFacebookMessengerPage;
