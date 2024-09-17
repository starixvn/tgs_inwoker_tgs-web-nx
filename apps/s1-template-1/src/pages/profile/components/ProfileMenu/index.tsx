import ProfileMenuDesktop from "@/pages/profile/components/ProfileMenu/ProfileMenuDesktop";
import ProfileMenuMobile from "@/pages/profile/components/ProfileMenu/ProfileMenuMobile";
import { useAccountStore } from "@tgs-web-nx/core";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useEffect } from "react";

const ProfileMenu = () => {
  useUpdatePageName("Account");
  const { isDesktopSize } = useRwd();
  const { getAccountInfo } = useAccountStore();

  useEffect(() => {
    getAccountInfo();
  }, [getAccountInfo]);

  return isDesktopSize ? <ProfileMenuDesktop /> : <ProfileMenuMobile />;
};

export default ProfileMenu;
