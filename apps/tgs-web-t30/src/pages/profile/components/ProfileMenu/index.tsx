import React, { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useAccountStore } from "@tgs-web-nx/core";
import ProfileMenuDesktop from "@/pages/profile/components/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/pages/profile/components/ProfileMenu/ProfileMenuMobile";

const ProfileMenu = () => {
  useUpdatePageName(i18n.t("profile.basicInfo"));
  const { isDesktopSize } = useRwd();
  const { getAccountInfo } = useAccountStore();

  useEffect(() => {
    getAccountInfo();
  }, [getAccountInfo]);

  return isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />;
};

export default ProfileMenu;
