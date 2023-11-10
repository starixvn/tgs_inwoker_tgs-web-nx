import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { useRwd } from "@/core/hooks/tools/useRwd";
import {
  profilePageDictionary,
  ProfilePathEnum,
} from "@/core/components/Profile/profilePageDictionary";
import { ValueOf } from "@/core/types/valueOf";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ProfilePage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <PageContainer>
        {isDesktopSize && <UserWalletInfo />}
        <ProfileMenu />
      </PageContainer>
    );
  }

  const isDialogOpen = !!ProfilePageComponent;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize ? <ProfileMenu /> : <ProfilePageComponent />}

      {isDesktopSize && (
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent />
        </ProfileDialog>
      )}
    </PageContainer>
  );
};

export default React.memo(ProfilePage);
