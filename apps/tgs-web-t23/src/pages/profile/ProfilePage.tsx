import React, { useMemo } from "react";
import { useRwd } from "@/core/hooks/tools/useRwd";
import {
  profilePageDictionary,
  ProfilePathEnum,
} from "@/core/components/Profile/profilePageDictionary";
import { useLocation } from "react-router";
import { ValueOf } from "@/core/types/valueOf";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ProfileMenu from "@/pages/profile/components/ProfileMenu";
import ProfileDialog from "@/components/UI/Dialog/ProfileDialog";

const ProfilePageContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

type Props = {};
const ProfilePage = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname as ValueOf<typeof ProfilePathEnum>;

  const ProfilePageComponent = useMemo(() => {
    return profilePageDictionary[path];
  }, [path]);

  if (path === ProfilePathEnum.PROFILE || !ProfilePageComponent) {
    return (
      <ProfilePageContainer>
        {isDesktopSize && <UserWalletInfo />}
        <ProfileMenu />
      </ProfilePageContainer>
    );
  }

  const isDialogOpen = !!ProfilePageComponent;

  const handleCloseDialog = () => {
    history.push("/profile");
  };

  return (
    <ProfilePageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize ? <ProfileMenu /> : <ProfilePageComponent />}

      {isDesktopSize && (
        <ProfileDialog open={isDialogOpen} onClose={handleCloseDialog}>
          <ProfilePageComponent />
        </ProfileDialog>
      )}
    </ProfilePageContainer>
  );
};

export default React.memo(ProfilePage);
