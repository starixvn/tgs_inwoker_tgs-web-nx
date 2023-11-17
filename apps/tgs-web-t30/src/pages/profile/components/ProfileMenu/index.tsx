import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import ProfileMenuDesktop from "@/pages/profile/components/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/pages/profile/components/ProfileMenu/ProfileMenuMobile";

const ProfileMenu = () => {
  useUpdatePageName(i18n.t("profile.basicInfo"));
  const { isDesktopSize } = useRwd();

  return isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />;
};

export default ProfileMenu;
