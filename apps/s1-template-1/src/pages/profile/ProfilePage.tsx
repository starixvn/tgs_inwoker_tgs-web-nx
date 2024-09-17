import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import { profilePageDictionary } from "@/components/account/Profile/profilePageDictionary";
import MenuTabs from "@/components/project/MenuTabs";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ValueOf } from "@tgs-web-nx/types";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

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
        <UserWalletInfo />
        {isDesktopSize && <MenuTabs />}
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
      <UserWalletInfo />
      {/* {isDesktopSize ? (
        <ProfileMenu />
      ) : (
        <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
      )}

      {isDesktopSize && (
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
        </ProfileDialog>
      )} */}
       <ProfileMenu />
       <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
        </ProfileDialog>
    </PageContainer>
  );
};

export default React.memo(ProfilePage);
