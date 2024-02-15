import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { ValueOf } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ProfilePathEnum } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { profilePageDictionary } from "@/components/account/Profile/profilePageDictionary";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";
import { PageContainer } from "@/components/styled-component/PageContainer";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";
import iconAccount from "@/assets/t26/images/account/navItem/icon-profile.svg";

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
        {isDesktopSize && (
          <PageBadge iconUrl={iconAccount} text={i18n.t("deposit.details.account")} />
        )}
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
      {isDesktopSize ? (
        <ProfileMenu />
      ) : (
        <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
      )}

      {isDesktopSize && (
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent handleCloseDialog={handleCloseDialog} />
        </ProfileDialog>
      )}
    </PageContainer>
  );
};

export default React.memo(ProfilePage);
