import React from "react";
import { useRwd } from "@/core/hooks/tools/useRwd";
import ProfileMenuDesktop from "@/components/pages/profile/components/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/components/pages/profile/components/ProfileMenu/ProfileMenuMobile";
import i18n from "@/utils/i18n";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

type Props = {};
const ProfileMenu = (props: Props) => {
  useUpdatePageName(i18n.t("profile.basicInfo"));
  const { isDesktopSize } = useRwd();

  return <>{isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />}</>;
};

export default ProfileMenu;
